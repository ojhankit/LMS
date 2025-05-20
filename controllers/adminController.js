const User = require('../models/User')

const approveUser = async(req,res) => {
    const {id} = req.params

    try {
        const user = await User.findByPk(id)

        if(!user) {
            return res.status(404).json({
                message:'User not found'
            })
        }

        user.isApproved = true
        await user.save()

        res.json({
            message: 'User approved Successfully'
        })
    }
    catch (e) {
        res.status(500).json({
            message:'Approval fail'
        })
    }
}

module.exports = {approveUser}