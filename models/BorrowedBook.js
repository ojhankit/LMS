const {DataTypes} = require('sequelize')
const sequelize = require('../config')

const BorrowedBook = sequelize.define('BorrowedBook',{
    borrowDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

module.exports = BorrowedBook