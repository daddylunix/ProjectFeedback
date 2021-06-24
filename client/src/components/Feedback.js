import { useState, useEffect } from "react";
import axios from 'axios';

import io from "socket.io-client";

let socket;

const Feedback = (props) => {
    const { userID } = props;
    const [feedback, setFeedback] = useState([]);
    const [feedbackRequest, setFeedbackRequest] = useState();

    useEffect(() => {
        socket = io('http://localhost:5000');

        socket.on("feedback:all", data => {
            console.log(socket.id)
            setFeedback(data);
        });

        return () => socket.disconnect();
    }, []);


    useEffect(() => {
        (async () => {
            await getFeedback();
        })()
    }, [])


    const postFeedback = async (e) => {
        e.preventDefault();

        console.log('posting feedback');
        const feedbacks = await axios.post(`http://localhost:5000/feedback/${userID}`, {
            user: userID,
            body: feedbackRequest,
            rating:5
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
            }
        })

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

    const onChange = (e) => {
        const value = e.target.value;
        setFeedbackRequest(value);
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
                    onChange={onChange}/>
                <input placeholder="rating" />
                <button type="submit" className="btn btn-primary">Submit Data</button>
            </form>
        </div>
    )
}

export default Feedback
