const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const userAuth = require('../middleware/user')



router.get('/allUser', userAuth, userController.getAllUser)
router.post('/signIn', userController.addUser)
router.put('/update/:id', userAuth, userController.updateUser)
router.delete('/delete/:id', userAuth, userController.deleteUser)
router.post('/logIn', userController.login)


module.exports = router
