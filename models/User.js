const {DataTypes} = require('sequelize')
const sequelize = require('../config')

// User Model
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    role:{
       type: DataTypes.STRING,
       defaultValue: 'Member'
    }
})

User.associate = (models) => {
    User.belongsToMany(models.Book, {
      through: models.BorrowedBook,
      foreignKey: "userId",
    })
}

module.exports = User