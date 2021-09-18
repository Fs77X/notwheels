const express = require('express')
const fs = require("fs")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
var cors = require('cors');
app.use(cors());
const multer  = require('multer')
// const upload = multer({ dest: '../models' }).single('data')

// app.options('*', cors());
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
const storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './models');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , file.originalname);   
    }
 });
const upload = multer({ storage: storage }).single("data");
app.post("/save", async (req, res) => {
    upload(req, res, (err) => {
        if(err) {
          res.status(400).send("Something went wrong!");
        }
        res.status(200).send("good job");
      });
})
