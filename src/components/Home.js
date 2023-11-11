import { useEffect, useState } from "react";
import ShowCard from "./ShowCard";
import axios from "axios";
import styles from './Home.module.css';

const Home = () => {
    const [content, setContent] = useState([]);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('https://blog-backend-7mbl.onrender.com/api/contents/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setContent(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    setError("Please login to see all the blogs");
                } else {
                    console.log('couldnt load data', err);
                }
            })
    }, [token])

    return (
        <div className={styles.component}>
            <section>
                {error ? <div>{error}</div> : (
                    <ul className={styles.blogs}>
                        {
                            content.map((data, index) => {
                                return (<ShowCard key={index} contentId={data._id} content={data} />)
                            })
                        }
                    </ul>
                )}
            </section>
        </div>
    )
}

export default Home;
