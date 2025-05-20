module.exports = (sequelize, DataTypes) => {
  const BorrowedBook = sequelize.define('BorrowedBook', {
    borrowDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  return BorrowedBook;
};
