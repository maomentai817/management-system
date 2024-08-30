const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {

  res.cc = (error,status=200) => {
    res.send({
      status,
      msg: error instanceof Error ? error.message : error,
    })
  }

  next();
})

const sqltest = require('./router/index.js');
const consumes = require('./router/consume.js');
const members = require('./router/member.js');
app.use('/api', sqltest);
app.use('/',consumes);
app.use('/',members);

app.listen(8088, () => {
  console.log('server running at http://localhost:8088');
})