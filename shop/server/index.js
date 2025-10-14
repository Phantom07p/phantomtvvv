// server/index.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const axios = require('axios');
const paypal = require('@paypal/checkout-server-sdk');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'))); // public enthält shop.html usw.

// PayPal environment
function paypalClient(){
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const env = new paypal.core.SandboxEnvironment(clientId, clientSecret); // Wechsel zu LiveEnvironment für produktiv
  return new paypal.core.PayPalHttpClient(env);
}

// Nodemailer setup (SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT||587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// --- Route: Create PayPal Order ---
app.post('/api/create-paypal-order', async (req, res) => {
  try{
    const { items, total, currency, customerEmail } = req.body;
    const client = paypalClient();

    // Build purchase units
    const purchase_units = [{
      amount: {
        currency_code: currency || 'EUR',
        value: total.toFixed(2),
        breakdown: {
          item_total: { currency_code: currency || 'EUR', value: total.toFixed(2) }
        }
      },
      items: items.map(it=>({
        name: it.name,
        unit_amount: { currency_code: currency || 'EUR', value: it.price.toFixed(2) },
        quantity: it.qty.toString()
      }))
    }];

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units,
      application_context: {
        return_url: process.env.PAYPAL_RETURN_URL || 'https://your-domain.com/paypal-success',
        cancel_url: process.env.PAYPAL_CANCEL_URL || 'https://your-domain.com/paypal-cancel'
      }
    });

    const order = await client.execute(request);
    // find approval url
    const approval = order.result.links.find(l => l.rel === 'approve');
    // Save order details server-side if du möchtest (DB)
    return res.json({ orderId: order.result.id, approvalUrl: approval.href });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'paypal-create-failed', detail: err.message });
  }
});

// --- PayPal capture route (optional) ---
// PayPal redirect after approval -> frontend will redirect to return_url -> implement a success page that calls capture
app.post('/api/capture-paypal-order', async (req, res) => {
  try{
    const { orderId, customerEmail } = req.body;
    const client = paypalClient();
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const capture = await client.execute(request);
    // Hier: prüfen ob capture.status === 'COMPLETED' etc.
    // Sende E-Mail-Bestätigung
    await sendConfirmationEmail(customerEmail, orderId, capture.result);
    return res.json({ ok:true, capture: capture.result });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'capture-failed', detail: err.message });
  }
});

// --- Coinbase Commerce: create charge (Krypto) ---
app.post('/api/create-crypto-charge', async (req, res) => {
  try{
    // Benutze Coinbase Commerce API
    const apiKey = process.env.COINBASE_COMMERCE_KEY;
    if(!apiKey) return res.status(400).json({error:'no-coinbase-key'});
    const { items, total, currency, customerEmail } = req.body;
    const data = {
      name: "Phantomtvvv Order",
      description: items.map(i=>`${i.qty}x ${i.name}`).join(', '),
      local_price: { amount: total.toFixed(2), currency: currency || 'EUR' },
      pricing_type: 'fixed_price',
      metadata: { customerEmail: customerEmail || '' }
    };
    const resp = await axios.post('https://api.commerce.coinbase.com/charges', data, {
      headers: { 'X-CC-Api-Key': apiKey, 'X-CC-Version': '2018-03-22', 'Content-Type':'application/json' }
    });
    // returns hosted_url
    return res.json({ hosted_url: resp.data.data.hosted_url, charge: resp.data.data });
  }catch(err){
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'coinbase-create-failed' });
  }
});

// --- Webhook endpoints (PayPal / Coinbase) ---
// Hinweis: PayPal Webhook Verification sollte implementiert — hier nur simple receiver
app.post('/webhook/coinbase', async (req,res)=>{
  // Coinbase Commerce webhook verification: prüfe signature mit COINBASE_COMMERCE_SHARED_SECRET
  // Für Demo: akzeptieren und versenden E-Mail falls 'charge:confirmed'
  const event = req.body;
  console.log('coinbase webhook', event.type);
  // TODO: sichere Verifikation implementieren
  if(event.type === 'charge:confirmed' || event.type === 'charge:resolved'){
    const email = event.data.metadata?.customerEmail;
    if(email) await sendConfirmationEmail(email, event.data.id, { info: 'krypto' });
  }
  res.status(200).send('ok');
});

// Minimaler PayPal webhook receiver (Produktiv: verifizieren via PayPal Webhook verify)
app.post('/webhook/paypal', async (req,res)=>{
  console.log('paypal webhook', req.body.event_type);
  // Wenn Zahlung abgeschlossen -> sende E-Mail
  // Produktionscode: prüfe signature/verifiy
  // Hier Demo: falls event_type === CHECKOUT.ORDER.APPROVED
  const evt = req.body;
  if(evt.event_type === 'PAYMENT.CAPTURE.COMPLETED' || evt.event_type === 'CHECKOUT.ORDER.APPROVED'){
    const email = evt.resource?.payer?.email_address || evt.resource?.custom_id;
    if(email) await sendConfirmationEmail(email, evt.resource?.id || evt.resource?.order_id, evt.resource);
  }
  res.sendStatus(200);
});

// --- sendConfirmationEmail ---
async function sendConfirmationEmail(toEmail, orderId, orderData){
  if(!toEmail) return;
  const html = `<h3>Danke für deine Bestellung!</h3>
    <p>Order-ID: ${orderId}</p>
    <pre>${JSON.stringify(orderData,null,2)}</pre>
    <p>Dein Produkt wird versendet / freigeschaltet sobald wir die Zahlung geprüft haben.</p>`;
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: toEmail,
    subject: 'Phantomtvvv - Bestellbestätigung',
    html
  });
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server läuft auf http://localhost:${PORT}`));
