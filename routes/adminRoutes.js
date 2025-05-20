const express = require('express')
const router = express.Router()
const {approveUser} = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')

router.patch('/approve/:id',authMiddleware.verifyToken,authMiddleware.isAdmin)

module.export = router