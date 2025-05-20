module.exports = (sequelize, DataTypes) => {
  const BorrowedBook = sequelize.define('BorrowedBook', {
    borrowDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Books',
        key: 'id'
      }
    }
  });
  
  BorrowedBook.associate = (models) => {
  BorrowedBook.belongsTo(models.User, { foreignKey: 'userId' });
  BorrowedBook.belongsTo(models.Book, { foreignKey: 'bookId' });
};

  return BorrowedBook;
};
