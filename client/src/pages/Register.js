import { useState, useEffect } from "react";
import axios from 'axios';
import {Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
    return (
        <div>
            <RegisterForm/>
        </div>
    )

}
export default Register;

