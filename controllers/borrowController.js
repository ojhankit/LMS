const { Book , BorrowedBook } = require('../models')

const borrowBook = async(req,res) => {
    const uId = req.user.id
    const bId = req.params.bookId

    try{
        const book = await Book.findByPK(bookId)
        if(!book || book.quantity < 1){
            return res.status(400).json({
                message: 'Book not available'
            })
        }

        const alreadyBorrowed = await BorrowedBook.findOne({
            where : { uId, bId, returnDate: null}
        })

        if(alreadyBorrowed){
            return res.status(400).json({
                message:"Already borrowed this book"
            })
        }

        await BorrowedBook.create({userId,bookId})

        book.quantity -= 1
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
    const uid = req.user.id
    const bid = req.params.bookId
    try{
        const borrowRecord = await BorrowedBook.findOne({
            where : {uid ,bid ,returnDate: null}
        })
        if(!borrowRecord){
            return res.status(404).json({
                message:'Borrow record not found or already returned'
            })
        }

        borrowRecord.returnDate = new Date()
        await borrowRecord.save()

        const book = await Book.findByPK(bid)
        book.quantity += 1
        await book.save()
        res.status(200).json({ message: "Book returned successfully." })
    }
    catch(e){
        res.status(500).json({ message: "Error returning book", error: err.message })
    }
}
modules.export = {borrowBook,}