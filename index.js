require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


const routes = require('./routes');
const db = require('./models')
const handle = require('./handlers');


const app = express();
let port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',(req,res) => res.json({hello:'world'}));
app.use('/api/auth',routes.auth);
app.use('/api/polls',routes.poll);

app.use(handle.notFound);
app.use(handle.error);

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/*', (req, res) => {
res.sendFile(path.join(__dirname, 'client','build', 'index.html'));
});


if (process.env.NODE_ENV === 'production') {
  app.use(express.static( 'client/build'));
     app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client','build', 'index.html'));
    });

    };


app.listen(port, () => console.log(`Server listening on port ${port}`));