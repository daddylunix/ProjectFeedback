import { useState, useEffect } from "react";
import axios from 'axios';
import {Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import React from 'react'

const LoginForm = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const history = useHistory();
    const loginHandler = async (e) => {
        e.preventDefault();
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', {email, password}, config)
            if (!data) console.log("something went wrong, can't login :(")
            console.log(data);
            Cookies.set('userAuth', data.token);
            history.push('/protected');
        } catch (error) {
            console.log(error);
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
                placeholder="Email.."
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                />
                <br/>
                <input 
                type="password"
                required
                id="password"
                placeholder="Email.."
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm
