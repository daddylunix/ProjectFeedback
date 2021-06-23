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
    const [ userID, setUserID ] = useState("");
    const [ feedbackBody, setFeedbackBody ] = useState("");
    const [ rating, setRating ] = useState("");

        const dataHandler = async (e) => {
            const test = Cookies.get('userAuth');
            if(!test) {
                history.push('/register')
            }


            try {
                const response = await axios.get('http://localhost:5000/dashboard',  {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                        "Content-Type": "application/json",
                        Authorization: test,
                    }
                })
                const userid = response.data.msg._id;
                setUserID(userid)
                setData(response.data.msg);
            } catch (error) {
                console.log(error);
            }
    }

    useEffect(() => {
        (async () => dataHandler())();
    }, [userID])

    return (
        <div>
            <center>
                <h2>{JSON.stringify(data)}</h2>
                <br />
                <Feedback
                    userID={userID}
                />
            </center>
        </div>
    )
}

export default Protected
