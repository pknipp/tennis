import React, { useState, useContext } from 'react';
import AuthContext from '../auth';

const SignUp = props => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    // const [playsSingles, setPlaysSingles] = useState(true);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('')
    const { fetchWithCSRF, setCurrentUser } = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    const submitForm = e => {
        e.preventDefault();
        (async _ => {
            const response = await fetchWithCSRF(`/api/users`, {
                method: 'POST', headers: { "Content-Type": "application/json" },
                credentials: 'include', body: JSON.stringify({ email, password, password2, name, phone })
            });
            const responseData = await response.json();
            if (!response.ok) {
                setErrors(responseData.errors);
            } else {
                setErrors([]);
                setCurrentUser(responseData.current_user);
            }
        })();
    }

    return (
        <form onSubmit={submitForm}>
            {errors.map(err => <li key={err} >{err}</li>)}
            <div>Please fill out all fields.</div>
            <input
                type="text" placeholder="Email" value={email}
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
                type="password" placeholder="Password" value={password}
                onChange={e => setPassword(e.target.value)} name="password"
            />
            <input
                type="password" placeholder="Confirm password" value={password2}
                onChange={e => setPassword2(e.target.value)} name="password2"
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};
export default SignUp;
