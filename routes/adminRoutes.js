const express = require('express')
const router = express.Router()
const {approveUser, updateUser ,deleteUser,getUser,getUsers} = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')

router.patch('/approve/:id',authMiddleware.verifyToken,authMiddleware.isAdmin,approveUser)
router.put('/update/:id',authMiddleware.verifyToken,authMiddleware.isAdmin,updateUser)
router.delete('/delete/:id',authMiddleware.verifyToken,authMiddleware.isAdmin,deleteUser)
router.get('/user',authMiddleware.verifyToken,authMiddleware.isAdmin,getUsers)
router.get('/user/:id',authMiddleware.verifyToken,authMiddleware.isAdmin,getUser)

module.exports = router