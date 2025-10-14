// Beispielprodukte — du kannst hier deine echten Daten laden (z.B. von /api/products)
const PRODUCTS = [
  { id: "hoodie", name: "Hoodie", desc: "Schwarzer Hoodie, rotes Phantom-Logo", price: 39.99 },
  { id: "tshirt", name: "T-Shirt", desc: "Weißes Shirt mit Print", price: 24.99 },
  { id: "cap", name: "Mütze", desc: "Rote Cap mit Stick", price: 19.99 },
  { id: "bag", name: "Tasche", desc: "Umhängetasche mit Logo", price: 29.99 }
];

let cart = {}; // { productId: qty }

const productsGrid = document.getElementById('productsGrid');
const cartBar = document.getElementById('cartBar');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const openCartBtn = document.getElementById('openCartBtn');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotalModal = document.getElementById('cartTotalModal');
const closeCart = document.getElementById('closeCart');
const payPaypal = document.getElementById('payPaypal');
const payCrypto = document.getElementById('payCrypto');
const toast = document.getElementById('toast');

function formatPrice(n){ return "€" + n.toFixed(2); }

function showToast(msg){
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(()=> toast.classList.add('hidden'), 3000);
}

function renderProducts(){
  productsGrid.innerHTML = '';
  PRODUCTS.forEach(p=>{
    const card = document.createElement('div'); card.className = 'product-card';
    card.innerHTML = `
      <div class="product-name">${p.name}</div>
      <div class="product-desc">${p.desc}</div>
      <div class="product-price">${formatPrice(p.price)}</div>
      <div class="product-controls">
        <div>
          Menge: <input type="number" min="1" value="1" data-id="${p.id}">
        </div>
        <div>
          <button class="btn addBtn" data-id="${p.id}">In Warenkorb</button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
  // add listeners
  document.querySelectorAll('.addBtn').forEach(b=>{
    b.addEventListener('click', (e)=>{
      const id = b.dataset.id;
      const qtyInput = document.querySelector(`input[data-id="${id}"]`);
      const qty = Math.max(1, parseInt(qtyInput.value || 1));
      addToCart(id, qty);
      showToast(`${qty}× ${PRODUCTS.find(x=>x.id===id).name} hinzugefügt`);
    });
  });
}

function addToCart(id, qty){
  cart[id] = (cart[id]||0) + qty;
  updateCartUI();
}

function updateCartUI(){
  const items = Object.entries(cart);
  const count = items.reduce((s,[id,q])=>s+q,0);
  const total = items.reduce((s,[id,q])=> s + (PRODUCTS.find(p=>p.id===id).price * q), 0);
  if(count>0) cartBar.classList.remove('hidden'); else cartBar.classList.add('hidden');
  cartCount.textContent = count;
  cartTotal.textContent = formatPrice(total);
  cartTotalModal.textContent = formatPrice(total);
}

openCartBtn.addEventListener('click', ()=> {
  renderCartModal();
  cartModal.classList.remove('hidden');
});

closeCart.addEventListener('click', ()=> cartModal.classList.add('hidden'));

function renderCartModal(){
  cartItems.innerHTML = '';
  const items = Object.entries(cart);
  if(items.length===0){
    cartItems.innerHTML = '<p>Dein Warenkorb ist leer.</p>';
    return;
  }
  items.forEach(([id,qty])=>{
    const p = PRODUCTS.find(x=>x.id===id);
    const row = document.createElement('div'); row.className = 'cart-row';
    row.innerHTML = `
      <div class="title">${p.name} <div style="font-size:12px;color:#bbb">${p.desc}</div></div>
      <div class="qty"><input type="number" min="1" value="${qty}" data-id="${id}"></div>
      <div class="price">${formatPrice(p.price * qty)}</div>
      <div><button class="btn secondary remove" data-id="${id}">Entfernen</button></div>
    `;
    cartItems.appendChild(row);
  });

  // quantity change handlers
  cartItems.querySelectorAll('input[type="number"]').forEach(inp=>{
    inp.addEventListener('change', ()=>{
      const id = inp.dataset.id; const v = Math.max(1, parseInt(inp.value||1));
      cart[id] = v;
      updateCartUI();
      renderCartModal();
    });
  });
  cartItems.querySelectorAll('.remove').forEach(b=>{
    b.addEventListener('click', ()=>{
      delete cart[b.dataset.id];
      updateCartUI();
      renderCartModal();
    });
  });
}

// --- Bezahl-Workflow (Frontend) ---
// PayPal: ruft Backend /create-order auf, öffnet Approval (Client-seitig öffnen wir PayPal-Checkout via redirect)
payPaypal.addEventListener('click', async ()=>{
  // Prepare order data
  const order = buildOrderPayload();
  if(!order) return showToast('Warenkorb ist leer');
  showToast('Erstelle PayPal Order...');
  try{
    const res = await fetch('/api/create-paypal-order', {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(order)
    });
    const data = await res.json();
    if(data && data.approvalUrl){
      // redirect to approval URL (PayPal login/approval)
      window.location.href = data.approvalUrl;
    } else {
      showToast('Fehler beim Erstellen der PayPal-Order');
      console.error(data);
    }
  }catch(err){
    console.error(err); showToast('Netzwerkfehler');
  }
});

// Crypto: ruft Backend /api/create-crypto-charge -> redirect zur Zahlungsseite (Coinbase Commerce)
payCrypto.addEventListener('click', async ()=>{
  const order = buildOrderPayload();
  if(!order) return showToast('Warenkorb ist leer');
  showToast('Erstelle Krypto-Charge...');
  try{
    const res = await fetch('/api/create-crypto-charge', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(order)
    });
    const data = await res.json();
    if(data && data.hosted_url){
      window.location.href = data.hosted_url;
    } else {
      showToast('Fehler beim Erstellen der Krypto-Charge');
      console.error(data);
    }
  }catch(err){ console.error(err); showToast('Netzwerkfehler'); }
});

function buildOrderPayload(){
  const items = Object.entries(cart).map(([id,qty])=>{
    const p = PRODUCTS.find(x=>x.id===id);
    return { id:p.id, name:p.name, price:p.price, qty };
  });
  if(items.length===0) return null;
  const total = items.reduce((s,it)=>s + it.price * it.qty, 0);
  // Du kannst hier auch Felder wie customer email abfragen (z.B. popup)
  return { items, total, currency:'EUR', customerEmail: prompt("Gib die E-Mail des Käufers ein (für Bestätigung):") || "" };
}

// initial
renderProducts();
updateCartUI();
