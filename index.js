const express = require('express')
const cors = require('cors')
const path = require('path')
const configureDB = require('./config/database')
const router = require('./config/routes')

const app = express()

app.use('/config/public', express.static('config/public'))
app.use(cors())
app.use(express.json())
app.use(router)

configureDB()

const port = process.env.PORT || 3040

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(port, ()=>{
    console.log('server is running on port',port)
})