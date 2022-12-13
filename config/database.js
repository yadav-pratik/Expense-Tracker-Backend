const mongoose = require('mongoose')

const url = 'mongodb+srv://yadavpratik:pratikyadav@cluster0.qskb7tw.mongodb.net/?retryWrites=true&w=majority'

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