const mongoose = require('mongoose')

const url = `mongodb+srv://yadavpratik:${process.env.MONGODB_PASS}@cluster0.3mbrwhi.mongodb.net/?retryWrites=true&w=majority`

// const url = 'mongodb://127.0.0.1:27017/expenseApp'

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