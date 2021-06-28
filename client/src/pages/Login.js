import LoginForm from '../components/LoginForm'
import {Link} from "react-router-dom";
const Login = () => {
    return (
        <div>
            <LoginForm/>
            <Link to='/register'>
                Register
            </Link>
        </div>
    )
}

export default Login
