const express = require('express')
const cors = require('cors')
const configureDB = require('./config/database')
const router = require('./config/routes')

const app = express()

app.use('/config/public', express.static('config/public'))
app.use(cors())
app.use(express.json())
app.use(router)

configureDB()

const port = 3040

app.listen(port, ()=>{
    console.log('server is running on port',port)
})