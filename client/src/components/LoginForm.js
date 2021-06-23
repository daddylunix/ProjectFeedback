import { useState, useEffect } from "react";
import axios from 'axios';
import {Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import React from 'react'

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
            <form onSubmit={loginHandler}>
                <h3>Login</h3>
                <input 
                type="email"
                required
                id="email"
                name='email'
                placeholder="Email.."
                value={email}
                onChange={handleOnChange}
                />
                <br/>
                <input 
                type="password"
                required
                id="password"
                name='password'
                placeholder="Password.."
                value={password}
                onChange={handleOnChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm
