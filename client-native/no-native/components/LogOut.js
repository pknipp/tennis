import React, { useContext } from 'react';
import AuthContext from '../auth'

const LogOut = props => {
    // const [errors, setErrors] = useState("");
    const { fetchWithCSRF, setCurrentUser } = useContext(AuthContext);
    const submitForm = async e => {
        e.preventDefault();
        const response = await fetchWithCSRF('/api/session', {
            method: 'DELETE', credentials: 'include'
        });
        if (response.ok) setCurrentUser(null);
    }

    return (
        <form onSubmit={submitForm}>
            {/* {errors.map(err => <li key={err} >{err}</li>)} */}
            <button type="submit">Logout</button>
        </form>
    );
};
export default LogOut;
