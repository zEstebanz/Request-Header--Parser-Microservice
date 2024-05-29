// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Middleware para obtener la IP del cliente:

app.use((req, res, next) => {
  req.clienteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  req.language = req.headers['accept-language'];
  req.software = req.headers['user-agent'];
  next();
})

app.get('/api/whoami', function (req, res) {
  res.json({
    ipaddress: req.clienteIp,
    language: req.language,
    software: req.software
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
