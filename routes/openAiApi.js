// const express = require('express');
// const router = express.Router();
// const https = require('https');

// router.post('/createImage', (req, res) => {
//     const promptText = req.body.prompt;
//     const options = {
//         method: 'POST',
//         hostname: 'dalle-3.p.rapidapi.com',
//         port: null,
//         path: '/api/v1/generate',
//         headers: {
//             'x-rapidapi-key': process.env.RAPIDAPI_KEY,
//             'x-rapidapi-host': 'dalle-3.p.rapidapi.com',
//             'Content-Type': 'application/json'
//         }
//     };

//     const request = https.request(options, function (response) {
//         const chunks = [];

//         response.on('data', function (chunk) {
//             chunks.push(chunk);
//         });

//         response.on('end', function () {
//             const body = Buffer.concat(chunks);
//             const responseData = JSON.parse(body.toString());
//             res.json(responseData);
//         });
//     });

//     request.write(JSON.stringify({
//         prompt: promptText
//     }));
//     request.end();
// });

// module.exports = router;
