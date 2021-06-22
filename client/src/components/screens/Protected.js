import { useState, useEffect } from "react";
import axios from 'axios';
import {Link } from 'react-router-dom';
import Cookies from 'js-cookie';

// Protected Route

const Protected = () => {
    const [ data, setData ] = useState("");
    const [ fault, setFault ] = useState("");
    const [ error, setError ] = useState("");
    const [ feedback, setFeedback ] = useState("");
    const dataHandler = async (e) => {
        const test = Cookies.get('userAuth');
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        };
        try {
            const response = await axios.post('http://localhost:5000/dashboard', {}, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "Content-Type": "application/json",
                    Authorization: test,
                }
            })
            const userid = response.data.msg._id;
            console.log(userid);
            const feedbacks = await axios.get(`http://localhost:5000/feedback/${userid}`, {}, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "Content-Type": "application/json",
                    Authorization: test,
                }
            })
            setFeedback(feedbacks.data)
            console.log(feedbacks.data);
            console.log(response.data);
            setData(response.data.msg);
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
            <h1>Feedback:</h1>
            <h3>{JSON.stringify(feedback[0])}</h3>
            </center>
        </div>
    )
}

export default Protected
