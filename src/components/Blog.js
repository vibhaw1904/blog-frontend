import { useParams } from 'react-router-dom';
import styles from './Blog.module.css';
import { useEffect, useState,useCallback } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { BiSolidAddToQueue } from "react-icons/bi";

import axios from 'axios';

const Blog = () => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const token = localStorage.getItem('token');
    const handleDelete = (commentid) => {
        axios.delete(`https://blog-backend-7mbl.onrender.com/api/contents/delete/comments/${commentid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setComments((data) => {
                return data.filter((comment) => comment._id !== commentid);
            });
        })
        .catch((err) => {
            console.log('Error deleting comment:', err);
        });
    };
    
    

    const fetchBlogData = useCallback(async () => {
        try {
            const response = await axios.get(`https://blog-backend-7mbl.onrender.com/api/contents/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data) {
                setBlogData(response.data);
            }
        } catch (error) {
            console.error('Error fetching blog data:', error);
        }
    },[id,token]) 

    const fetchComments = useCallback(async () => {
        try {
            const response = await axios.get(`https://blog-backend-7mbl.onrender.com/api/contents/comments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data) {
                setComments(response.data);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    },[id,token]); 

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentDate = new Date().toISOString();
            const userResponse = await axios.get('https://blog-backend-7mbl.onrender.com//api/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            const userName = userResponse.data.username; // Assuming 'name' is the property that holds the username
    
            const response = await fetch('https://blog-backend-7mbl.onrender.com/api/contents/comments/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name: userName,
                    postId: id,
                    date: currentDate,
                    comments: comment
                })
            });
    
            if (response.ok) {
                const newComment = {
                    name: userName,
                    postId: id,
                    date: currentDate,
                    comments: comment
                };
                setComments((prevComments) => [...prevComments, newComment]);
                setComment('');}
                else {
                // Handle other response statuses (e.g., error handling)
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };
    
    useEffect(() => {
        if (id) {
            fetchBlogData();
            fetchComments();
        }
    }, [id,fetchBlogData,fetchComments]);

    if (!blogData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.card}>
            <div className={styles.blog_img}>
                <img src={`https://blog-backend-7mbl.onrender.com/${blogData.picture}`} alt="Blog" />
            </div>
            <div className={styles.lower}>
                <div className={styles.about}>
                    <h2>{blogData.title}</h2>
                    <p>{blogData.description}</p>
                </div>
                <div className={styles.comment}>
                    <form onSubmit={handleCommentSubmit}>
                        <input
                            type="text"
                            placeholder="Add a comment"
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                       <button type=""> <BiSolidAddToQueue className={styles.add}type="submit">Add</BiSolidAddToQueue></button>
                    </form>
                </div>
                <div className={styles.comments}>
                    <h2>Comments</h2>
                    <ul>
                        {comments.map((commentItem) => (
                            <div className={styles.list_comment}>
                             <strong>{commentItem.name}: </strong>
                            <li key={commentItem._id}>{commentItem.comments}</li>
                            <AiFillDelete className={styles.delete_icon} onClick={() => handleDelete(commentItem._id)} type="">delete</AiFillDelete>
                            </div>
                            
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Blog;
