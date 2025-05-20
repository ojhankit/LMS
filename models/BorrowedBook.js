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

  return BorrowedBook;
};
