import React, { useState } from 'react';
import './Signup.css'
import axios from 'axios';
const Signup = () => {
    const[username,setUsername]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('https://blog-backend-7mbl.onrender.com/api/users/',{username,email,password})
        .then((res)=>{
            console.log(res.data);
            setEmail('');
            setUsername('');
            setPassword('');
        })
        .catch=(err)=>{
            console.log('failed signing up',err);
        }
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='input-field'>
              
                    
                
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="current-name" 
                    onChange={(e)=>(setUsername(e.target.value))}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="current-email" 
                    onChange={(e)=>(setEmail(e.target.value))}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    autoComplete="current-password" 
                    onChange={(e)=>(setPassword(e.target.value))}
                />
               
            </div>
            <div className='signup-btn'>
                <button type="">Signup</button>
            </div>
            </form>
        
    )
}

export default Signup;
