const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {omit} = require('lodash')
const fs = require('fs')

const User = require('../models/user')

const usersController = {}

usersController.register = async (req, res) => {
    try {
        const {email, password, profile} = req.body
        const user = new User({email, password, profile})
        const u = await user.save()
        res.json({
            success : 'Account Created Successfully'
        })
    } catch (error) {
        if(error.code === 11000){
            res.json({
                errors : error,
                message : 'Email address is taken. Please Enter a different one!'
            })
        } else {
            res.json(error) 
        }
    }
}

usersController.login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(user){   //email is found
            const match = await bcrypt.compare(password, user.password)
            if(match){
                const tokenData = {
                    _id : user._id,
                    email : user.email
                }
                const token = jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn : '7d'})
                res.json({
                    token : `Bearer ${token}`
                })
            } else {
                res.json({
                    notice : 'invalid email or password'        //if passwords do not match
                })
            }
        } else {
            res.json({
                notice : 'invalid email or password'           //if email not found
            })
        }
    } catch (error) {
        res.json(error)              //problem in connection to db
    }
    
}

usersController.show = async (req, res) => {
    try {
        const user = await User.findById(req.tokenData._id)
        const userObj = JSON.parse(JSON.stringify(user))
        res.json(omit(userObj, ['password']))
    } catch (error) {
        res.json(error)
    }
}

usersController.update = async (req, res) => {
    const body = req.body 
    let updatedBody
    if(req.files){
        updatedBody = {...body, profilePic : { data : req.files.profilePic.data }}
    } else {
        updatedBody = {...body}
    }
    try {
        const user = await User.findByIdAndUpdate( req.tokenData._id, updatedBody , {new : true, runValidators : true})
        const userObj = JSON.parse(JSON.stringify(user))
        res.json(omit(userObj, ['password']))
    } catch (error) {
        res.json(error)
    }
}

module.exports = usersController