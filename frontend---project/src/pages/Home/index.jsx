import {Component} from 'react';
import axios from 'axios';
import Details from '../Details'
import './index.css'


class Home extends Component {

    state={isLoader:true, details:[],bookTitle:'',author:'',review:'',reviewerName:''}

        componentDidMount(){
            this.gettingDetails();
        };

        gettingDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5555/books');
                this.setState({ details: response.data.data, isLoader:false });
            } catch (error) {
                console.log("Error fetching details:", error);
            }
        }

        formSubmition = async  (event) =>{
            event.preventDefault()
            const {bookTitle, author, review, reviewerName} = this.state

            const data = {
                bookTitle, author, review, reviewerName
            }
            try{
              const response = await axios.post('http://localhost:5555/books', data)
                this.setState({ bookTitle: '', author: '', review: '', reviewerName: '' });
                this.gettingDetails();
                console.log(response)
            }
            catch (error) {
                console.error("Error adding book:", error);
            }
        }

        newBookname = event => {
            this.setState({bookTitle : event.target.value})
        }

        newauthorname = event => {
            this.setState({author : event.target.value})
        }

        newreviewname = event => {
            this.setState({review : event.target.value})
        }

        newreviewername = event => {
            this.setState({reviewerName : event.target.value})
        }

        deleteReview = async (_id) => {
            try {
                await axios.delete(`http://localhost:5555/books/${_id}`);
                this.setState(prevState => ({
                    details: prevState.details.filter(review => review._id !== _id) // Update state directly
                }));
            } catch (error) {
                console.error('Error deleting review:', error);
            }
        }

    render () {

        const {isLoader, details, bookTitle,author,review,reviewerName} = this.state

        return (
            <div className='home-main-container'>
                <form onSubmit={this.formSubmition}>
                    <div className='input-container'>
                    <label className='label'>
                        Book Title
                    </label>
                    <input className='input' value={bookTitle} onChange={this.newBookname} type="text" placeholder='Enter Book Name' />
                    <label className='label'>
                        Author Name
                    </label>
                    <input className='input' value={author} onChange={this.newauthorname} type="text" placeholder='Enter Author Name' />
                    <label className='label'>
                        Review
                    </label>
                    <input className='input' value={review} onChange={this.newreviewname} type="text" placeholder='Write Your Review' />
                    <label className='label'>
                        Reviewer Name
                    </label>
                    <input className='input' value={reviewerName} onChange={this.newreviewername} type="text" placeholder='Enter Your Name' />
                    <button className='submit'>Submit</button>
                    </div>
                </form>

                <ul className='unOrder-container'>
                    {details.map((everyItem)=>(
                        <li key={everyItem._id}><Details deleteReview={this.deleteReview} items={everyItem} /></li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Home;

