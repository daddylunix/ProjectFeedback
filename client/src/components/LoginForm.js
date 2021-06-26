import { useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import React from 'react'
import Button from '@material-ui/core/button'
import TextField from '@material-ui/core/TextField';

const LoginForm = () => {
    const history = useHistory();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios
                .post('http://localhost:5000/api/auth/login', {email, password},
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

            if (!data) console.log("something went wrong, can't login :(")
            console.log(data);

            Cookies.set('userAuth', data.token);
            history.push('/protected');
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name
        if(inputName === 'email') {
            setEmail(value)
        }else if(inputName === 'password') {
            setPassword(value)
        }
    }

    return (
        <div>
            <center>
            <form onSubmit={loginHandler}>
                <h3>Login</h3>
                <TextField 
                type="email"
                required
                id="email"
                name='email'
                placeholder="Email.."
                value={email}
                onChange={handleOnChange}
                variant="outlined"
                />
                <br/><br/>
                <TextField 
                type="password"
                required
                id="password"
                name='password'
                placeholder="Password.."
                value={password}
                onChange={handleOnChange}
                variant="outlined"
                />
                <br/><br/>
                <Button variant="contained" color="primary" type="submit" className="btn btn-primary">Login</Button>
            </form>
            </center>
        </div>
    )
}

export default LoginForm
