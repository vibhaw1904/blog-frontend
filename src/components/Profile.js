import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Profile.module.css';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from "react-icons/ai";

const Profile = ({props}) => {
    const [formData, setFormData] = useState({});
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null)

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            axios.get('https://blog-backend-7mbl.onrender.com/api/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res.data);
                setFormData(res.data);
                setIsUserLoggedIn(true)
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setIsUserLoggedIn(false);
                } else {
                    console.error('Error fetching user data:', error);
                }
            });
        }
        else {
            setIsUserLoggedIn(false); // No token, user is not logged in
        }
    }, [token]);
    
    if (isUserLoggedIn === null) {
        return <div>Loading...</div>; // Render a loading state
    }

    return (
        <div className={styles.card}>
            {isUserLoggedIn ? (
                <>
                    <div className={styles.user}>
                    <AiOutlineUser/>
                    </div>
                    <div className={styles.user_name}>
                        <h3>Username: {formData.username}</h3>
                        <h3>Email: {formData.email}</h3>
                    </div>
                    <div className={styles.logout}>
                    </div>
                </>
            ) : (
                <div className={styles.login_signup}>
                    <p>Please log in to view your profile.</p>
                    <button type="button" ><Link to='/'>Login/Signup</Link></button>

                </div>
                
                )}
        </div>
    );
}

export default Profile;
