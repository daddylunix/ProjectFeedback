import { useState, useEffect } from "react";
import axios from 'axios';
import {Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const Register = () => {
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    const [ responseData, setResponseData ] = useState("");
    const history = useHistory();

    const registerHandler = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type":" application/json"
            }
        }
        try {
            const {data} = await axios.post("http://localhost:5000/api/auth/register", {username, email, password}, config) 
            if (!data) { setError("Something went wrong... ")}
            console.log(data);
            setResponseData(data);
            Cookies.set('userAuth', data.token )
            history.push("/protected");

        } catch (error) {
            setError(error.response.data.message);
            console.log(error);
        }
    }
    return (
    <div>
        <form className="register-screen__form" onSubmit={registerHandler}>
            <h3>Register</h3>
            <input
            type="text"
            required 
            id="name"
            placeholder="Enter username"
            value={username} onChange={(e) => {setUsername(e.target.value)}}/>
            <br/>
            <input
            type="text"
            required 
            id="email"
            placeholder="Enter an Email"
            value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            <br/>
             <input
            type="text"
            required 
            id="password"
            placeholder="Enter a password"
            value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <br/>
            <button type="submit" className="btn btn-primary">Register</button>
            <br/>
            <Link to='/login'>
                Login
            </Link>
            </form>
            {error}
            <h3>{responseData.token}</h3>
    </div>
    )
}

export default Register;
