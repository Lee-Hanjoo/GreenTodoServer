const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const todos = require('./api/todos');
const news = require('./api/news');
// const member = require('./api/member.bak')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/todos',todos);
app.use('/news',news);
// app.use('/member',member);

app.listen(4000)