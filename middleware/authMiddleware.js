const jwt = require('jsonwebtoken')
const {User} = require("../models")

const verifyToken = async (req,res,next) => {
    const token = req.headers['authorization']
    if(!token) {
        return res.status(401).json({
            message: 'Token Missing'
        })
    }

    try{
        const decoded = jwt.verify(token.split(' ')[1],process.env.JWT_SECRET)
        const user = await User.findByPk(decoded.id)

        if(!user || !user.isApproved){
            return res.status(403).json({
                message:'Unauthorized or not approved'
            })
        }

        req.user = user
        next()
    }
    catch(e){
        return res.status(401).json({
            message:'Invalid Token',
            error:e.message
        })
    }
}

// role based access roles
const isAdmin = (req,res,next) => {
    if(req.user.role!=='Admin'){
        return res.status(403).json({
            message:'Admin only'
        })
    }
    next();
}

const isLibrarian = (req,res,next) => {
    if(req.user.role!=='Librarian'){
        return res.status(403).json({
            message:'Librarian only'
        })
    }
    next();
}

const isMember = (req,res,next) => {
    if(req.user.role!=='Member'){
        return res.status(403).json({
            message:'Member only'
        })
    }
    next();
}

module.exports = {
    verifyToken,
    isAdmin,
    isMember,
    isLibrarian
}