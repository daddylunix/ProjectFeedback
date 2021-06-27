import { useState, useEffect } from "react";
import axios from 'axios';
import Button from '@material-ui/core/button'
import TextField from '@material-ui/core/TextField';

const Feedback = (props) => {
    const { userID } = props;
    const [feedback, setFeedback] = useState([]);
    const [rating, setRating ] = useState([]);
    const [feedbackRequest, setFeedbackRequest] = useState();

    useEffect(() => {
        (async () => {
            await getFeedback()
        })()
    }, [userID])

    const postFeedback = async (e) => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        };
        try {
            const feedbackPost = await axios.post(`http://localhost:5000/feedback/${userID}`, {
                user: userID,
                body: feedbackRequest,
                rating:rating
            }, {headers})
        } catch (error) {
            console.log(error);
        }
    }

    const getFeedback = async () => {
        const feedbacks = await axios.get(`http://localhost:5000/feedback/${userID}`, {}, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
            }
        })
        const feedbackdata = feedbacks.data;
        setFeedback(feedbackdata)
    }
    return (
        <div>
            <h1>Feedback:</h1>
            {
                feedback.length > 0 && feedback.map((feedbackItem, index) => <h3 key={index}>{JSON.stringify(feedbackItem)}</h3>)
            }
            <br/>
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
