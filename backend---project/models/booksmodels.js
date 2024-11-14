import mongoose from "mongoose";

const bookDetail = mongoose.Schema({
bookTitle : {
    type: String,
    require : true,
},
author : {
    type: String,
    require : true,
},review : {
    type: String,
    require : true,
},reviewerName : {
    type: String,
    require : true,
},

},
{
    timestamps:true,
}
);

export const Book = mongoose.model('Book', bookDetail);