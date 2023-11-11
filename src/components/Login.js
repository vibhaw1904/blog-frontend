import { useState } from 'react';
import Signup from './Signup';
import axios from 'axios';
import './Login.css';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLoggedIn(!isLoggedIn)
    }
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        axios.post('https://blog-backend-7mbl.onrender.com/api/users/login/', { email, password })
            .then((res) => {
                const token = res.data.token;
                const userId = res.data._id; 
                localStorage.setItem('token', token);
                localStorage.setItem('_id', userId);
    
                toast.success('Successfully logged in!', {
                    position: 'down-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
    
                console.log(res.data);
                setIsLoggedIn(true);  // Corrected this line
                navigate('/home', { state: { data: res.data } });
            })
            .catch((err) => {
                console.log('Login failed', err);
                setIsLoggedIn(false);
            });
    };
    
    const handleSignupSubmit = (userData) => {
        axios.post('https://blog-backend-7mbl.onrender.com/api/users/', userData)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log('failed signing up', err);
            });
    }

    return (
        <div className="main-card">
            <ToastContainer />
            {isLoggedIn
                ? (
                    <form className="login-form" action="" onSubmit={handleLoginSubmit}>
                        <div className='input-field'>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                autoComplete="current-email" 
                                onChange={(e) => (setEmail(e.target.value))}
                            />
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                autoComplete="current-password" 
                                onChange={(e) => (setPassword(e.target.value))}
                            />
                        </div>
                        <div className='login-btn'>
                            <button type='submit'>Login</button>
                        </div>
                    </form>
                )
                : <Signup onSubmit={handleSignupSubmit} />
            }
            <p>
                {isLoggedIn
                    ? "Haven't registered yet? "
                    : 'Already have an account? '}
                <span onClick={toggleForm} style={{ cursor: 'pointer', color: 'blue' }}>
                    {isLoggedIn ? 'Register here' : 'Login here'}
                </span>
            </p>
        </div>
    )
}

export default Login;
