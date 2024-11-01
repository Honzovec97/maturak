const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: ['https://maturak-kc1dvw24o-honzovec97s-projects.vercel.app'], // Allow only the front-end origin
    methods: ['GET', 'POST']
}));
app.use(bodyParser.json());

const filePath = path.join(__dirname, 'data.json');

app.post('/save-data', (req, res) => {
    const { name, number } = req.body;

    fs.readFile(filePath, 'utf8', (err, fileData) => {
        let jsonData = [];
        if (!err && fileData) {
            jsonData = JSON.parse(fileData);
        }

        const isDuplicate = jsonData.some(entry => entry.number === number);
        if (isDuplicate) {
            return res.status(400).json({ message: 'ČÍSLO JE JIŽ ZAREGISTROVANÉ' });
        }

        jsonData.push({ name, number });
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'NEPODAŘILO SE ULOŽIT DATA - ZKUSTE TO ZNOVU' });
            }
            res.status(200).json({ message: 'ÚSPĚŠNĚ JSI SE ZAREGISTROVAL - VYHLÁŠENÍ PROBĚHNE V 23:30' });
        });
    });
});

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
}

app.listen(3000, () => {
    console.log('Server is running on Vercel');
});
