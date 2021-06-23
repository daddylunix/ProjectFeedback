import { useState, useEffect } from "react";
import axios from 'axios';
import {Link, Redirect, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import Feedback from "../Feedback";

const Protected = () => {
    const history = useHistory();
    const [ data, setData ] = useState("");
    const [ fault, setFault ] = useState("");
    const [ error, setError ] = useState("");
    const [ feedback, setFeedback ] = useState("");
    const [ UserID, setUserID ] = useState("");
    const [ feedbackBody, setFeedbackBody ] = useState("");
    const [ rating, setRating ] = useState("");

    const dataHandler = async (e) => {
        const test = Cookies.get('userAuth');
        console.log(test);
        if(!test || test == undefined || test == "undefined") {
            history.push('/register')
        }
        try {
            const response = await axios.get('http://localhost:5000/dashboard', {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "Content-Type": "application/json",
                    Authorization: test,
                }
            })
            const userid = response.data.msg._id;
            setUserID(userid)
            console.log(UserID);
            const feedbacks = await axios.get(`http://localhost:5000/feedback/${userid}`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "Content-Type": "application/json",
                    Authorization: test,
                }
            })
            const feedbackdata = feedbacks.data; 
            setFeedback(feedbackdata)
            console.log(feedback);
            console.log(response.data);
            setData(response.data.msg);
        } catch (error) {
            console.log(error);
        }
    }
    const FeedbackWidget = async (e) => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        };
        try {
            const feedbackPost = await axios.post(`http://localhost:5000/feedback/${UserID}`, {
                user: UserID,
                body:feedbackBody,
                rating:5
            }, {headers})
            console.log(feedbackPost);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        dataHandler();
    }, [])
    return (
        <div>
            <center>
            <h2>{JSON.stringify(data)}</h2>
                <Feedback
                    feedback={feedback}
                />
            <br/>
            <form onSubmit={FeedbackWidget}>
                <input 
                placeholder="Feedback body" 
                id="feedback-body" 
                value={feedbackBody} 
                onChange={(e) => {setFeedbackBody(e.target.value)}}/> 
                <input placeholder="rating"></input>
                <button type="submit" className="btn btn-primary">Submit Data</button>
                </form>
            </center>
        </div>
    )
}

export default Protected
