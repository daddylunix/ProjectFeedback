import { useState, useEffect } from "react";
import axios from 'axios';
import Button from '@material-ui/core/button'
import TextField from '@material-ui/core/TextField';

const Feedback = (props) => {
    const { userID } = props;
    const [feedback, setFeedback] = useState([]);
    const [feedbackRequest, setFeedbackRequest] = useState('');
    const [rating, setRating] = useState(1);

    useEffect(() => {
        (async () => {
            await getFeedback();
        })()
    }, [userID])


    const postFeedback = async (e) => {
        e.preventDefault();

        console.log('posting feedback');
        try{
            const newFeedback = await axios.post(`http://localhost:5000/feedback/${userID}`, {
                user: userID,
                body: feedbackRequest,
                rating
            }, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "Content-Type": "application/json",
                }
            })
            const feedbackList = [...feedback, newFeedback.data.feedback];
            setFeedback(feedbackList);
        }catch(e){
            console.log(e);
        }

        setFeedbackRequest('')

        }

    const getFeedback = async () => {
        const feedbacks = await axios.get(`http://localhost:5000/feedback/${userID}`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
            }
        })
        const feedbackdata = feedbacks.data;
        setFeedback(feedbackdata)
    }

    const onChange = (e) => {
        const value = e.target.value;
        if(e.target.name === 'rating'){
            setRating(parseInt(value));
        }else{
            setFeedbackRequest(value);
        }
    }

    return (
        <div>
            <h1>Feedback:</h1>
            {
                feedback.length > 0 && feedback.map((feedbackItem, index) => <h3 key={index}>{JSON.stringify(feedbackItem)}</h3>)
            }
            <form onSubmit={postFeedback}>
                <TextField
                placeholder="Feedback :D"
                id="feedback-body"
                value={feedbackRequest}
                onChange={(e) => {setFeedbackRequest(e.target.value)}}
                variant="outlined"
                required
                />
                <TextField
                type="number"
                placeholder="Rating 1/5"
                id="rating-body"
                value={rating}
                onChange={(e) => {setRating(e.target.value)}}
                variant="outlined"
                required
                />
                <br/><br/>
                <Button variant="contained" color="primary" type="submit" className="btn btn-primary">Submit Feedback</Button>
            </form>
        </div>
    )
}

export default Feedback
