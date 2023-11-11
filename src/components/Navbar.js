// import React, { useState } from 'react';
import './Navbar.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogin } from 'react-icons/ai';
const Navbar = (props) => {
const navigate=useNavigate();
// const[logout,setLogout]=useState('');
const token=localStorage.getItem('token');
const logoutHandler=async(e)=>{
    e.preventDefault();
    await axios.post('https://blog-backend-7mbl.onrender.com/api/users/logout',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    localStorage.removeItem('token');
    navigate('/')
}

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">Blog.</Link>
                <ul className="nav-links">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/create">Create</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/mypost">My posts</Link></li>
                    <AiOutlineLogin type="button" className='logout' onClick={logoutHandler}></AiOutlineLogin>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
