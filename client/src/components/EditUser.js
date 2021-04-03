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

    const submitForm = e => {
        e.preventDefault();
        (async _ => {
            const response = await fetchWithCSRF(`/api/users/${props.currentUser.id}`, {
                method: 'PUT', headers: {"Content-Type": "application/json"}, credentials: 'include',
                body: JSON.stringify({ email, name, phone, password, password2 })
            });
            const responseData = await response.json();
            // console.log(responseData);
            if (!response.ok) {
                setErrors(responseData.errors);
            } else if (responseData.messages) {
                setMessages(responseData.messages)
            } else {
                setCurrentUser(responseData.current_user);
                history.push('/')
            }
        })();
    }

    const deleteUser = e => {
        e.preventDefault();
        (async _ => {
            const response = await fetchWithCSRF(`/api/users/${props.currentUser.id}`, {
                method: 'DELETE', headers: {"Content-Type": "application/json"},
                credentials: 'include', body: JSON.stringify({})
            });
            const responseData = await response.json();
            if (!response.ok) {
                setErrors(responseData.errors);
            } else if (responseData.messages) {
                setMessages(responseData.messages)
            } else {
                setCurrentUser(null);
            }
        })();
    }

    const submitPhoto = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        setImageLoading(true);
        const data = await fetch('/api/photos', {method: "POST", body: formData});
        setImageLoading(false);
        setImage(null);
        return (data.ok) ? setUrl((await data.json()).photo_url) : console.log("error");
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
            {!url ? null : <img className="middle" src={url} /> }
            <form onSubmit={submitPhoto}>
                <h3>{url ? "Would you like to update your photo?" : "Please upload a headshot."}</h3>
                <div>
                    <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])}/>
                    {!image ? null : <button type="submit">Submit</button>}
                    {imageLoading && <span>Loading...</span>}
                </div>
            </form>
            <form onSubmit={deleteUser}>
                {messages.map(err => <li key={err}>{err}</li>)}
                <h2>Would you like to delete your account?</h2>
                <button type="submit">Delete Account</button>
            </form>
        </>
    );
};

export default EditUser;
