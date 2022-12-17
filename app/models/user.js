const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')

const Budget = require('../models/budget')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        validate : {
            validator : (value) => {
                return isEmail(value)
            },
            message : () => {
                return 'invalid email format'
            }
        }
    },
    password : {
        type : String,
        required : true,
        minLength : 8,
        maxLength : 128
    },
    profile : {
        name : {
            type : String,
            required : true
        },
        occupation : {
            type : String
        }
    },
    profilePic : {
        // type : String
        data : Buffer,
        contentType : String
    }

},{timestamps : true})

usersSchema.pre('save', async function (next){
    try {
        const user = this
        const salt = await bcrypt.genSalt(10)
        const encrypted = await bcrypt.hash(user.password, salt)
        user.password = encrypted
        next()
    } catch (error) {
        res.json(error)
    }
})

usersSchema.post('save', async (data, next) => {
    try {
        const budget = new Budget({userId : data._id})
        const b = await budget.save()
        next()
    } catch (error) {
        console.log(error)
    }
})
const User = mongoose.model('User',usersSchema)

module.exports = User