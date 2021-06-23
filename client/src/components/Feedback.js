import { useState, useEffect } from "react";
import axios from 'axios';
import {Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Feedback = (props) => {
    const { userlink } = props; 
    const [ feedback, setFeedback ] = useState("");
    const userid = Cookies.get('userAuth');
    const fetchData = async (e) => {
        const feedbacks = await axios.get(`http://localhost:5000/feedback/${userlink}`, {}, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "Content-Type": "application/json",
                    Authorization: test,
                }
            })
        
    }
    
    return (
        <div>
            
        </div>
    )
}

export default Feedback
