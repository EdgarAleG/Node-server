const express = require('express');

const app = express();

app.get('/', function(request, response) {
    response.send('Hola mundo!');
})

app.listen(3000);