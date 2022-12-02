const mongoose = require('mongoose')

const configureDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/expenseApp')
        .then(()=>{
            console.log('connected to db')
        })
        .catch(()=>{
            console.log('problem connecting to db')
        })
}

module.exports = configureDB