// /api/save-data.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Set CORS options to allow the specific frontend origin
const corsOptions = {
    origin: 'https://maturak-psi.vercel.app',
    methods: 'POST',
    allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

let jsonData = []; // In-memory storage for registration data

// Endpoint to save data
app.post('/save-data', (req, res) => {
    const { name, number } = req.body;

    // Check for duplicate numbers
    const isDuplicate = jsonData.some(entry => entry.number === number);
    if (isDuplicate) {
        return res.status(400).json({ message: 'ČÍSLO JE JIŽ ZAREGISTROVANÉ' });
    }

    // Add new data to in-memory storage
    jsonData.push({ name, number });
    res.status(200).json({ message: 'ÚSPĚŠNĚ JSI SE ZAREGISTROVAL - VYHLÁŠENÍ PROBĚHNE V 23:30' });
});

module.exports = app;
