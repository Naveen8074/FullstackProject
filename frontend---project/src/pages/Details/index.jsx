import './index.css'

const Details = ({items, deleteReview}) =>{
    const {bookTitle, author, review, reviewerName, _id} = items
    const handleDelete = () => {
        deleteReview(_id);
    };

    return (
        <div className='details-main-container'>
            <h1 className="title">{bookTitle}</h1>
            <p className='author'>By: {author}</p>
            <p className='review'>Review: {review}</p>
            <h1 className='reviewername'>Reviewername: {reviewerName}</h1>
                <button className='delete' onChange={handleDelete}>Delete</button>
        </div>
    )
}

export default Details