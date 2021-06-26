import { useState, useEffect } from "react";
import axios from 'axios';
import {Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/button'
import Card from '@material-ui/core/card';
import TextField from '@material-ui/core/TextField';

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
        <center>
            <br/>
            <form className="register-screen__form" onSubmit={registerHandler}>
            <h3>Register</h3>
            <TextField 
            id="name" 
            required
            label="Username" 
            value={username} 
            onChange={(e) => {setUsername(e.target.value)}}
            variant="outlined"
            />
            <br/><br/>
            <TextField 
            type="email"
            id="email" 
            label="Email" 
            value={email} 
            onChange={(e) => {setEmail(e.target.value)}}
            required
            variant="outlined"
            />
            <br/><br/>
            <TextField 
            id="password" 
            label="Password" 
            value={password} 
            onChange={(e) => {setPassword(e.target.value)}}
            required
            variant="outlined"
            />
            <br/><br/>
            <Button variant="contained" color="primary" type="submit" className="btn btn-primary">Register</Button>
            </form>
            {error}
            <h3>{responseData.token}</h3>
            </center>
    </div>
    
    )
}

export default Register;
{/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
