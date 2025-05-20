module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isbn: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    publishedYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  });

  Book.associate = (models) => {
    Book.belongsToMany(models.User, {
      through: models.BorrowedBook,
      foreignKey: "bookId",
    });
  };

  return Book;
};
