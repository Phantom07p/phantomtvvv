const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.SERVER_PORT || process.env.PORT || 80;

// Statische Dateien servieren
app.use(express.static(__dirname));

// Alle Routen zur index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ PHANTOMTVVV Server läuft auf Port ${PORT}`);
});
