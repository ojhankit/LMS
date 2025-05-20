// imports
const db = require('../models');
const User = db.User
const Book = db.Book;
const BorrowedBook  = db.BorrowedBook

const borrowBook = async(req,res) => {

    const userId = req.user.id
    const bookId = req.params.bookId

    try{
        const book = await Book.findByPk(bookId)
        if(!book || book.quantity < 1){
            return res.status(400).json({
                message: 'Book not available'
            })
        }

        const alreadyBorrowed = await BorrowedBook.findOne({
            where : { userId, bookId, returnDate: null}
        })

        if(alreadyBorrowed){
            return res.status(400).json({
                message:"Already borrowed this book"
            })
        }

        await BorrowedBook.create({userId,bookId})

        book.quantity -= 1
        await book.save()

        res.status(200).json({
            message:"Book Borrowed Successfully"
        })
    }
    catch(e) {
        res.status(500).json({
            message:'Error borrowing book',
            error:e.message
        })
    }
}

const returnBook = async(req,res) => {
    const userid = req.user.id
    const bookid = req.params.bookId
    try{
        const borrowRecord = await BorrowedBook.findOne({
            where : {userid ,bookid ,returnDate: null}
        })
        if(!borrowRecord){
            return res.status(404).json({
                message:'Borrow record not found or already returned'
            })
        }

        borrowRecord.returnDate = new Date()
        await borrowRecord.save()

        const book = await Book.findByPk(bookid)
        book.quantity += 1
        await book.save()
        res.status(200).json({ message: "Book returned successfully." })
    }
    catch(e){
        res.status(500).json({ message: "Error returning book", error: e.message })
    }
}

const getBorrowedBooks = async(req,res) => {
    try{
        const borrowed = await BorrowedBook.findAll({
        where: { returnDate: null },  // not returned yet
        include: [
            { model: User, attributes: ['id', 'name', 'email'] },
            { model: Book, attributes: ['id', 'title', 'author'] }
        ],
        order: [['createdAt', 'DESC']]
        });
        res.status(200).json(borrowed);
    }
    catch(e) {
        res.status(500).json({
        message: 'Error fetching borrowed books',
        error: e.message
        });
    }
}

const getReturnedBooks = async (req, res) => {
  try {
    const returned = await BorrowedBook.findAll({
      where: { returnDate: { [db.Sequelize.Op.ne]: null } }, // returnDate is NOT null
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Book, attributes: ['id', 'title', 'author'] }
      ],
      order: [['returnDate', 'DESC']]
    });
    res.status(200).json(returned);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching returned books',
      error: e.message
    });
  }
};

module.exports = {borrowBook,returnBook,getBorrowedBooks,getReturnedBooks}