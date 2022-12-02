const Category = require('../models/category')
const User = require('../models/user')

const categoriesController = {}

categoriesController.list = async (req, res) => {
    const tokenData = req.tokenData
    try {
        const categories = await Category.find({userId : tokenData._id})
        res.json(categories)
    } catch (error) {
        res.json(error)
    }
}

categoriesController.create = async (req, res) => {
    const body = req.body
    const tokenData = req.tokenData
    try {
        const category = new Category({...body, userId : tokenData._id})
        const c = await category.save()
        res.json(c)
    } catch (error) {
        res.json(error)
    }
}

categoriesController.update = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const category = await Category.findOneAndUpdate({_id : id , userId : req.tokenData._id}, body, {new : true, runValidators : true})
        if(category){
            res.json(category)
        } else {
            res.json({
                notice : 'Bad Request'
            })
        }
    } catch (error) {
        res.json(error)
    }
}

categoriesController.delete = async (req, res) => {
    const id = req.params.id
    try{
        const category = await Category.findOneAndDelete({_id : id , userId : req.tokenData._id})
        if(category){
            res.json(category)
        } else {
            res.json({
                notice : 'Bad Request'
            })
        }
    } catch (error){
        res.json(error)
    }
}

module.exports = categoriesController