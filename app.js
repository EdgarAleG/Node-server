const express = require('express');
const app = express();
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const storageStrategy = multer.memoryStorage();
const upload = multer({ storage: storageStrategy });

app.use(express.json());

app.get('/', function(request, response) {
    response.send('Hola mundo!');
});

app.post('/imagen', upload.single('imagen') , async function(req, res) {
    const img = req.file;

    const processedImage = sharp(img.buffer);

    const resizedImage = processedImage.resize(200, 800, {
        fit: 'contain',
        background: '#FFF'
    });

    const resizedImageBuffer = await resizedImage.toBuffer();

    fs.writeFileSync('newpath/test.png', resizedImageBuffer);

    console.log(processedImage);
    
    res.send({ resizedImage: resizedImageBuffer });
});
 
const PORT = process.env.PORT || 3000;

console.log(PORT);

app.listen(PORT, function() {
    console.log("Server listening on port: ", PORT);
});