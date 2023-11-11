import axios from "axios";
import { useEffect, useState } from "react";
import styles from './Mypost.module.css';
import Showmypost from "./Showmypost";

const Mypost = () => {
    const [content, setContent] = useState([]);
    const [error,setError]=useState(null);
    const userId = localStorage.getItem('_id');
    const token = localStorage.getItem('token');
    console.log(userId)
    useEffect(() => {
        axios.get(`https://blog-backend-7mbl.onrender.com/api/contents/mypost/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
            setContent(res.data);
        })
        .catch((err) => {
            console.log('Error:', err);
            setError('Please login first to see your blogs')
        });
    }, [token, userId]);
    
    const handleDelete = (postId) => {
        setContent((data) => {
          return data.filter((content) => content._id !== postId);
        });
      };
    return (
        <div className={styles.component}>
            <section>
                {error ?<div>
                    {error}
                </div> : <ul className={styles.blogs}>
                    {
                        content.map((data, index) => {
                            return (
                                <Showmypost content={data} key={index} contentId={data._id} handleDelete={handleDelete} />
                            );
                        })
                    }
                </ul>}
               
            </section>
        </div>
    );
}

export default Mypost;
