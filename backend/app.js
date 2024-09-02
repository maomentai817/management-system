const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const config=require('./config.js')
const expressJWT = require('express-jwt');

const cors = require('cors');
app.use(cors());
app.use(express.json());


app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {

  res.cc = (error,status=200) => {
    res.send({
      status,
      msg: error instanceof Error ? error.message : error,
    })
  }

  next();
})

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: ['/login', '/pictures', '/ai', '/ai/clear'] }));

app.use('/uploads', express.static('./uploads'))

const sqltest = require('./router/index.js');
const consumes = require('./router/consume.js');
const members = require('./router/member.js');
const pictures = require('./router/picture.js');
const users = require('./router/user.js')
const ai = require('./router/ai.js')
app.use('/api', sqltest);
app.use('/',consumes);
app.use('/',members);
app.use('/',pictures);
app.use('/',users);
app.use('/',ai);

app.listen(8088, '192.168.1.103', () => {
  console.log('server running at http://localhost:8088');
})