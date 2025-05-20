const { Book } = require('../models/Book')

// create Book
const createBook = async (req,res) => {
    try{
        const book = await Book.create(req.body)
        res.status(201).json(book)
    }
    catch(e) {
        res.status(400).json({
            error:e.message
        })
    }
}

// get All book
const getAllBook = async (req,res) => {
    try{
        const books = await Book.findAll()
        req.json(books)
    }
    catch(e){
        res.status(500).json({
            error:e.message
        })
    }
}

// get Book By Id
const getBookById = async(req,res) => {
    try{
        const book = await Book.findById(req.params)
        req.json(book)
    }
    catch(e){
        res.status(500).json({
            error:e.message
        })
    }
}

// update Book
const updateBook = async(req,res) => {
    try{
        const updated = await Book.update(req.body,{where: {id}})
        if (updated[0] == 0){
            return res.status(404).json({
                message:'Book not found'
            })
        }
        res.json({
            message:'Book updated Successfully'
        })
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

//delete Book
const deleteBook = async(req,res) => {
    try{
        const {id} = req.params
        const deleted = await Book.destroy({where: {id}})
        if (!deleted) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ message: "Book deleted successfully" });
    }
    catch (e){
        res.status(500).json({
            error:e.message
        })
    }
}

module.exports = { 
    createBook,
    getAllBook,
    getBookById,
    updateBook,
    deleteBook
}