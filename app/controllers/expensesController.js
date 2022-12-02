const Expense = require('../models/expense')

const expensesController = {}

expensesController.list = async (req, res) => {
    const tokenData = req.tokenData
    try {
        const expenses = await Expense.find({userId : tokenData._id}).populate('categoryId')
        res.json(expenses)
    } catch (error) {
        res.json(error)
    }
}

expensesController.create = async (req, res) => {
    const body = req.body
    const tokenData = req.tokenData
    try {
        const expense = new Expense({...body, userId : tokenData._id})
        const exp = await expense.save()
        const expenseObj = await Expense.findById(exp._id).populate('categoryId')
        res.json(expenseObj)
    } catch (error) {
        res.json(error)
    }
}

expensesController.update = async (req, res) => {       
    const id = req.params.id
    const action = req.query.action
    if(action === 'update'){
        const body = req.body
        try {
            const expense = await Expense.findOneAndUpdate({_id : id , userId : req.tokenData._id}, body, {new : true}).populate('categoryId')
            if(expense){
                res.json(expense)
            } else {
                res.json({
                    notice : 'Bad Request'
                })
            }
        } catch (error) {
            res.json(error)
        }
    } else {        //either action - 'delete@true' or 'delete@false'
        try {
            const expense = await Expense.findOneAndUpdate({_id : id , userId : req.tokenData._id}, {isDeleted : action.split('@')[1]},{ new : true}).populate('categoryId')  
            if(expense){
                res.json(expense)
            } else {
                res.json({
                    notice : 'Bad Request'
                })
            }
        } catch (error) {
            res.json(error)
        }
    }
}

module.exports = expensesController