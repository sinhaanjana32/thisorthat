require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require("path");


let PORT = process.env.PORT || 8080
const routes = require('./routes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const mongoose = require("mongoose");
mongoose
.connect(process.env.MONGODB_URI || 'mongodb+srv://us:password@cluster0.oxi54.mongodb.net/<dbname>?retryWrites=true&w=majority' , { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("DB connected"))
.catch(err => console.error(err));


app.use('/api/auth', routes.auth);
app.use('/api/polls', routes.poll);




if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../client/build')));
     app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });

    }

    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
    

    
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));