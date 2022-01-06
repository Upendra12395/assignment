const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const userAuth = require('../middleware/user')


router.get('/allUser', userAuth, userController.getAllUser)
router.post('/signUp', userController.signIn)
router.post('/logIn', userController.logIn)
router.patch('/update/:id', userAuth, userController.updateOne)
router.delete('/remove/:id', userAuth, userController.remove)


module.exports = router