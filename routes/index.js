const express = require('express');
const https = require('https');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

// Route to handle image generation
router.post('/generate', (req, res) => {
    const prompt = req.body.inputs;
    const password = req.body.password;

    // Check the password
    if (password !== process.env.PASSWORD) {
        return res.status(401).json({ error: 'Incorrect password' });
    }

    const options = {
        method: 'POST',
        hostname: 'ai-text-to-image-generator-api.p.rapidapi.com',
        port: null,
        path: '/realistic',
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': 'ai-text-to-image-generator-api.p.rapidapi.com',
            'Content-Type': 'application/json',
        }
    };

    const apiReq = https.request(options, apiRes => {
        let chunks = [];
        apiRes.on('data', chunk => chunks.push(chunk));
        apiRes.on('end', () => {
            const body = Buffer.concat(chunks).toString();
            const response = JSON.parse(body);

            if (response.url) {
                res.json({ url: response.url });
            } else {
                res.status(500).json({ error: 'Error generating image' });
            }
        });
    });

    apiReq.on('error', error => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    });

    apiReq.write(JSON.stringify({ inputs: prompt }));
    apiReq.end();
});

module.exports = router;
