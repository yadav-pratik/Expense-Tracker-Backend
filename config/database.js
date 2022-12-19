const mongoose = require('mongoose')
require('dotenv').config()

const url = `mongodb+srv://yadavpratik:${process.env.MONGODB_PASS}@cluster0.3mbrwhi.mongodb.net/?retryWrites=true&w=majority`

const configureDB = () => {
    mongoose.connect(url)
        .then(()=>{
            console.log('connected to db')
        })
        .catch(()=>{
            console.log('problem connecting to db')
        })
}

module.exports = configureDB