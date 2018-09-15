const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { router } = require('./router');
require('../database/models');

const port = 9000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public/')));
app.use('/api', router);

app.listen(port, err => {
  if (err) {
    console.log('error connecting to port', port);
  } else {
    console.log('error syncing to db', err);
  }
});
