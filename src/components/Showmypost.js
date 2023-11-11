import axios from 'axios';
import styles from './Showmypost.module.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Showmypost=({content,contentId,handleDelete})=>{
    const [comment, setComment] = useState('');
  const [showFullDesc, setShowFullDesc] = useState(false);
  const toggleDesc = () => {
    setShowFullDesc(prevState => !prevState);
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log('Comment submitted:', comment);
    setComment('');
  };
  const deleteHandler=()=>{
    const token=localStorage.getItem('token');
    axios.delete(`https://blog-backend-7mbl.onrender.com/api/contents/delete/${contentId}`,{headers:{
        Authorization:`Bearer ${token}`
    }})
    .then(() => {
        handleDelete(contentId)
        console.log('Post deleted successfully');

}) 
      
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  }
    return (
        <div className={styles.showCard}>
        <div className={styles.cardImage}>
        <Link to={`/blog/${contentId}`}> {/* Add a Link component here */}
            <img src={`https://blog-backend-7mbl.onrender.com/${content.picture}`}re alt="Blog"  />
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
          <div className={styles.delete_btn}>
            <button type="delete" onClick={deleteHandler}>Delete blog</button>
          </div>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      </div>
    )
}
export default Showmypost;