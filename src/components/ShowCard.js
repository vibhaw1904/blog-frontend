import React, { useState, useEffect } from 'react';
import styles from './ShowCard.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BiSolidAddToQueue } from "react-icons/bi";
import { AiFillDelete } from 'react-icons/ai';


const ShowCard = ({ content, contentId }) => {
  const [comment, setComment] = useState('');
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [comments, setComments] = useState([]);
  const token=localStorage.getItem('token');
  const toggleDesc = () => {
    setShowFullDesc((prev) => !prev);
  };
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


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
        const currentDate = new Date().toISOString();
        const userResponse = await axios.get('https://blog-backend-7mbl.onrender.com/api/users/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const userName = userResponse.data.username; 

        const response = await fetch('https://blog-backend-7mbl.onrender.com/api/contents/comments/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: userName,
                postId: contentId,
                date: currentDate,
                comments: comment
            })
        });

        if (response.ok) {
            const newComment = {
                name: userName,
                postId: contentId,
                date: currentDate,
                comments: comment
            };
            setComments((prevComments) => [...prevComments, newComment]);
            setComment('');}
            else {
        }
    } catch (error) {
        console.error('Error adding comment:', error);
    }
};



  useEffect(() => {
    // Fetch only two comments initially for the current contentId
    axios
      .get(`https://blog-backend-7mbl.onrender.com/api/contents/comments/${contentId}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [contentId]);

 

  return (
    <div className={styles.showCard}>
      <div className={styles.cardImage}>
        <Link to={`/blog/${contentId}`}>
          <img src={`https://blog-backend-7mbl.onrender.com/${content.picture}`} alt="Blog" />
        </Link>
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles['card-title']}>{content.title}</h2>
        <p className={styles['card-description']}>
          {showFullDesc ? content.description : `${content.description.slice(0, 100)}...`}
          {content.description.length > 100 && (
            <span className={styles['read-more']} onClick={toggleDesc}>
              {showFullDesc ? 'Read Less' : 'Read More'}
            </span>
          )}
        </p>
        <form onSubmit={handleCommentSubmit} className={styles.comment_inputs}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button type="" className={styles.add}><BiSolidAddToQueue className={styles.adds}  type="submit"></BiSolidAddToQueue></button>
        </form>
        <div className={styles.comments}>
          <h3>Comments:</h3>
          <ul>
            {comments.slice(0,2).map((commentItem) => (
              <div  key={commentItem._id} className={styles.fetch_cmment}>
                <strong>{commentItem.name}: </strong>
                <li>{commentItem.comments}</li>
                <AiFillDelete className={styles.delete_icon} onClick={() => handleDelete(commentItem._id)} type="">delete</AiFillDelete>
              </div>
            ))}
          </ul>
          
        </div>
      </div>
    
    </div>
  );
};

export default ShowCard;
