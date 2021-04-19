import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../auth'


const EditUser = props => {
    const { fetchWithCSRF, currentUser, setCurrentUser } = useContext(AuthContext);
    const [email, setEmail] = useState(currentUser.email);
    const [name, setName] = useState(currentUser.name);
    const [phone, setPhone] = useState(currentUser.phone);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('')
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [url, setUrl] = useState(currentUser.photo_url);
    const [errors, setErrors] = useState([]);
    const [messages, setMessages] = useState([]);
    let history = useHistory();

    const submitForm = async e => {
        e.preventDefault();
        const response = await fetchWithCSRF(`/api/users/${props.currentUser.id}`, {
            method: 'PUT', headers: {"Content-Type": "application/json"}, credentials:'include',
            body: JSON.stringify({ email, name, phone, password, password2 })
        });
        const data = await response.json();
        setErrors(data.errors || []);
        setMessages(data.messages || []);
        if (response.ok) {
            setCurrentUser(data.current_user);
            history.push('/');
        }
    }

    const deleteUser = async e => {
        e.preventDefault();
        const response = await fetchWithCSRF(`/api/users/${props.currentUser.id}`, {
            method: 'DELETE', headers: {"Content-Type": "application/json"},
            credentials: 'include', body: JSON.stringify({})
        });
        const data = await response.json();
        setErrors(data.errors || []);
        setMessages(data.messages || []);
        if (response.ok) setCurrentUser(null);
    }

    const submitPhoto = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        setImageLoading(true);
        const response = await fetch('/api/photos', {method: "POST", body: formData});
        setImageLoading(false);
        setImage(null);
        return (response.ok) ? setUrl((await response.json()).photo_url) : console.log("error");
    }

    return (
        <>
            <form onSubmit={submitForm}>
                {errors.length ? errors.map(err => <li key={err}>{err}</li>) : ''}
                <input
                    type="email" placeholder="Email" value={email}
                    onChange={e => setEmail(e.target.value)} name="email"
                />
                <input
                    type="text" placeholder="Nickname" value={name}
                    onChange={e => setName(e.target.value)} name="name"
                />
                <input
                    type="text" placeholder="Phone # (w/area code)" value={phone}
                    onChange={e => setPhone(e.target.value)} name="phone"
                />
                <input
                    type="password" placeholder="New password (required)" value={password}
                    onChange={e => setPassword(e.target.value)} name="password"
                />
                <input
                    type="password" placeholder="Confirm new password (required)" value={password2}
                    onChange={e => setPassword2(e.target.value)} name="password2"
                />
                <button type="submit">Submit Changes</button>
            </form>
            {!url ? null : <img className="middle" src={url} alt={url ? currentUser.name : "nothing"} /> }
            <form onSubmit={submitPhoto}>
                <h2>{url ? "Would you like to update your photo?" : "Please upload a headshot below."}</h2>
                <div>
                    <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])}/>
                    {!image ? null : <button type="submit">Submit</button>}
                    {imageLoading && <span>Loading...</span>}
                </div>
            </form>
            <form onSubmit={deleteUser}>
                {messages.map(err => <li key={err}>{err}</li>)}
                <h3>Would you like to delete your account?</h3>
                <button type="submit">Delete Account</button>
            </form>
        </>
    );
};

export default EditUser;
