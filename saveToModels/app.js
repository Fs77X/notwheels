const express = require('express')
const fs = require("fs")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.post("/save/:filename", async (req, res) => {
    const filename = req.params.filename
    const data = req.body.data
    fs.writeFile('/home/farquad/Documents/notwheels/models/' + filename, data, err => {
        if(err) {
            console.log(err)
            res.status(500).send()
            return
        }
    })
    res.status(200).send()
})
