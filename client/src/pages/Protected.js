import { useState, useEffect } from "react";
import axios from 'axios';
import {useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import Feedback from "../components/Feedback";

const Protected = () => {
    const history = useHistory();
    const [ data, setData ] = useState("");
    const [ error, setError ] = useState("");
    const [ userID, setUserID ] = useState("");

        const dataHandler = async (e) => {
            const test = Cookies.get('userAuth');
            if(!test) {
                history.push('/login')
            }
            try {
                const response = await axios.get('http://localhost:5000/dashboard',  {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                        "Content-Type": "application/json",
                        Authorization: test
                    }
                })
                const userid = response.data.msg._id;
                console.log(userid);
                setUserID(userid)
                setData(response.data.msg);
                if(error){
                    setError('');
                }
            } catch (error) {
                const errorResponse = error.response.data;
                if(errorResponse){
                    setError(errorResponse.message);
                }
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
                <span>{error}</span>
            </center>
        </div>
    )
}

export default Protected
