import { useState, useEffect } from "react";
import axios from 'axios';
import {Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Feedback = () => {
    const [ feedback, setFeedback ] = useState("");
    const userid = Cookies.get('userAuth');
    const fetchData = async (e) => {
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        };
        
    }
    
    return (
        <div>
            
        </div>
    )
}

export default Feedback
