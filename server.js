const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello world\n');
});

app.use('/users', require('./api/users'));

app.listen(3000, () => {
    console.log('port 3000');
});
