import React, { useState } from "react";
import axios from "axios";
import './Create.css';

const Create = () => {
    const [formData, setFormData] = useState({
        username: "",
        title: "",
        description: "",
        selectedImage: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        // const { username, title, description, selectedImage } = formData;
        const token = localStorage.getItem('token');
        const content=new FormData();

        content.append('username',formData.username)
        content.append('title',formData.title)
        content.append('description',formData.description)
        // content.apppend('user_id',formData.user_id)
        content.append('file',formData.selectedImage)
        //  content = {
        //     username:formData.username,
        //     title:formData.title,
        //     description:formData.description,
        //     file: formData.selectedImage
        // };
    
        try {
            const response = await axios.post('https://blog-backend-7mbl.onrender.com/api/contents/', content, {
                headers: {
                    Authorization: `Bearer ${token}`,
                'content-type': 'multipart/form-data'                 }
            });
            console.log("Response Data:", response.data);
    
            setFormData({
                username: "",
                title: "",
                description: "",
                selectedImage: null
            });
    
        } catch (error) {
            console.error('Could not add', error);
        }
    }
    

    const handleImageSubmit = (e) => {
        const file = e.target.files[0];
        console.log("Selected Image:", file);
        setFormData({ ...formData, selectedImage: file });
    }

    return (
        <div className="create-card">
            <h1>Create your Blog here</h1>
            <form onSubmit={handleFormSubmit}  >
                <input type="text" name="username" id="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                <div className="title">
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} placeholder="Title" />
                </div>
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSubmit}
                    />
                    {formData.selectedImage && (
                        <div>
                            <h2>Selected Image:</h2>
                            <img src={URL.createObjectURL(formData.selectedImage)} alt="Selected" style={{ maxWidth: '100%' }} />
                        </div>
                    )}
                </div>
                <div className="description">
                    <input type="text" name="description" id="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                </div>
                <div className="create-btn">
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default Create;
