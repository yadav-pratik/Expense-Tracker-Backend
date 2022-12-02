const Budget = require('../models/budget')

const budgetsController = {}

budgetsController.show = async (req, res) => {
    const tokenData = req.tokenData
    try {
        const budget = await Budget.findOne({userId : tokenData._id})
        res.json(budget)
    } catch (error) {
        res.json(error)
    }
}

budgetsController.update = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const budget = await Budget.findOneAndUpdate({_id : id , userId : req.tokenData._id}, body, {new : true})
        if(budget){
            res.json(budget)
        } else {
            res.json({
                notice : 'Bad Request'
            })
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports = budgetsController