const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : [true, 'Email should be Unique'],
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
        type : String
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

const User = mongoose.model('User',usersSchema)

module.exports = User