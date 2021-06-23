import { useState, useEffect } from "react";
import axios from 'axios';
import {Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Feedback = (props) => {
    const { userID } = props;

    const [feedback, setFeedback] = useState([]);
    const [feedbackRequest, setFeedbackRequest] = useState();

    useEffect(() => {
        (async () => {
            await getFeedback()
        })()
    }, [userID])

    const postFeedback = async () => {
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        };
        try {
            const feedbackPost = await axios.post(`http://localhost:5000/feedback/${userID}`, {
                user: userID,
                body: feedbackRequest,
                rating:5
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
            <form onSubmit={postFeedback}>
                <input
                    placeholder="Feedback body"
                    id="feedback-body"
                    value={feedbackRequest}
                    onChange={(e) => {setFeedbackRequest(e.target.value)}}/>
                <input placeholder="rating"></input>
                <button type="submit" className="btn btn-primary">Submit Data</button>
            </form>
        </div>
    )
}

export default Feedback
