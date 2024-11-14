import express from "express";
import {Book} from '../models/booksmodels.js'; 


const router = express.Router();

// Post book review
router.post('/', async (request, response) => {
    try{

        if(!request.body.bookTitle || !request.body.author ||!request.body.review || !request.body.reviewerName ){
            return response.status(400).send({
                message : 'send all the required fields'
            })
        }
        const bookReview = {
            bookTitle: request.body.bookTitle,
            author: request.body.author,
            review: request.body.review,
            reviewerName: request.body.reviewerName,
        }

        const reviewDetails = await Book.create(bookReview);

        return response.status(201).send(reviewDetails)

    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
} );

//Get book all reviews
router.get('/', async (request, response) => {
    try{

        const books = await Book.find({});
        return response.status(200).json({count: books.length, data: books})

    }
    catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message});
    }
});

//Get book review by ID

router.get('/:id', async (request, response) => {
    try{
        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book)

    }
    catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message});
    }
});

//Updating the book by id
router.put('/:id', async (request, response) => {
    try{
    if(!request.body.bookTitle || !request.body.author ||!request.body.review || !request.body.reviewerName ){
        return response.status(400).send({
            message : 'send all the required fields'
        })
    }
    const {id} = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if(!result){
        return response.status(404).json({message: 'Book not found'});
    }
    return response.status(200).send({message: 'Book updated successfully'})

    }
    catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message});
    }
});


//Delete the book by id
router.delete('/:id', async (request, response) => {
    try{

    const {id} = request.params;
    const result = await Book.findByIdAndDelete(id, request.body);

    if(!result){
        return response.status(404).json({message: 'Book not found'});
    }
    return response.status(200).send({message: 'Book deleted successfully'})

    }
    catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message});
    }
});

export default router