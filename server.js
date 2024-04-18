/* eslint-disable no-undef */
require('dotenv').config();

const express = require('express');
const app = express();
const compression = require('compression');
const serverPort = process.env.SERVER_PORT;

app.use(compression());

app.listen(serverPort, () => console.info(`started server on port ${serverPort}`));

app.use(express.static(`${__dirname}`));
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/health',(req,res)=> {
  res.send ("{ message: 'OK', noIntercept: true }");
});
