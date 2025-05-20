const db = require('../models');
//console.log(db)
const User = db.User;
const { Op } = require("sequelize");


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
            message:'Approval fail',
            error:e.message
        })
    }
}

const updateUser = async(req,res) => {
    const {id} = req.params

    try{
        const [updated] = await User.update(req.body, {where:{id}})
        if(updated===0){
            return res.status(404).json({
                message:"User not found or no changes made"
            })
        }
        res.json({
            message:"Updated Successfully"
        })
    }
    catch (e){
        res.status(500).json({
            message:"Error updating user",
            error:e.message
        })
    }
}

const deleteUser = async(req,res) => {
    const {id} = req.params
    try{
        const deleted = await User.destroy({where:{id}})

        if(!deleted){
            return res.status(404).json({
                message:"user not found"
            })
        }
        res.json({
            message:"User deleted"
        })
    }
    catch(e) {
        res.status(500).json({
            message:"Error in deleting User",
            error:e.message
        })
    }
}

const getUsers = async(req,res) => {
    try{
        const users = await User.findAll({
            where: {
                role:{
                    [Op.ne] : 'Admin'
                }
            },
            attributes: { exclude: ['password'] }  
        })

        res.status(200).json({
            message: "Users list",
            users: users
        })
    }
    catch(e) {
        res.status(500).json({
            message:"Error in fetching users",
            error:e.message
        })
    }
}

const getUser = async(req,res) => {
    const userId = req.params.id

    try {
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message: "User fetched successfully",
            user
        })
    } catch (e) {
        res.status(500).json({
            message: "Error fetching user",
            error: e.message
        })
    }
}
module.exports = {approveUser ,updateUser ,deleteUser ,getUsers,getUser}