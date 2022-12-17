const express = require('express')
const upload = require('express-fileupload')

const imageUpload = upload()

const usersController = require('../app/controllers/usersController')
const categoriesController = require('../app/controllers/categoriesController')
const expensesController = require('../app/controllers/expensesController')
const budgetsController = require('../app/controllers/budgetsController')

const authenticateUser = require('../app/middlewares/authentication')

const router = express.Router()

//user APIs

router.post('/api/users', usersController.register)
router.post('/api/users/login',usersController.login)
router.get('/api/users', authenticateUser, usersController.show)
router.put('/api/users', imageUpload, authenticateUser, usersController.update)

//category APIs

router.get('/api/categories', authenticateUser, categoriesController.list)
router.post('/api/categories', authenticateUser, categoriesController.create)
router.put('/api/categories/:id', authenticateUser, categoriesController.update)
router.delete('/api/categories/:id', authenticateUser, categoriesController.delete)

//expense APIs
router.get('/api/expenses', authenticateUser, expensesController.list)
router.post('/api/expenses', authenticateUser, expensesController.create)
router.put('/api/expenses/:id', authenticateUser, expensesController.update)

//budget APIs

router.get('/api/budget', authenticateUser, budgetsController.show)
router.put('/api/budget/:id', authenticateUser, budgetsController.update)

module.exports = router