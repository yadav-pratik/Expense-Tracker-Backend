const mongoose = require('mongoose')

const Schema = mongoose.Schema

const expenseSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    expenseDate : {
        type : Date,
        required : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    categoryId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'Category'
    }
}, {timestamps : true})

const Expense = mongoose.model('Expense',expenseSchema)

module.exports = Expense