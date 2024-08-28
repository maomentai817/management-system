const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const sqltest = require('./router/index.js');
app.use('/api', sqltest);

app.listen(8088, () => {
  console.log('server running at http://localhost:8088');
})