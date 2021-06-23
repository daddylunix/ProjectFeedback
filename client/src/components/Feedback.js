import { useState, useEffect } from "react";
import axios from 'axios';
import {Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Feedback = (props) => {
    const { feedback } = props;

    
    return (
        <div>
            <h1>Feedback:</h1>
            {feedback.length > 0 && feedback.map(feedbackItem => <h3>{JSON.stringify(feedbackItem)}</h3>)}
        </div>
    )
}

export default Feedback
