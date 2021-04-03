import React, { useState, useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import AuthContext from '../auth';
import Member from './Member';


const Members = () => {
    const { fetchWithCSRF } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [, setErrors] = useState([]);
    const [, setMessages] = useState([]);
    // let history = useHistory();

    const getUsers = _ => {
        (async _ => {
            const data = await fetchWithCSRF(`/api/users`);
            const res = await data.json();
            // console.log(responseData);
            if (!data.ok) {
                setErrors(data.errors);
            } else if (data.messages) {
                setMessages(data.messages)
            } else {
                setUsers(res.users);
                // history.push('/')
            }
        })();
    }
    useEffect(getUsers, []);

    return (
        <div className="tableContainer">
        <table>
            <thead><tr><th>name</th><th>email</th><th>phone</th><th>photo</th></tr></thead>
            <tbody>
                {users.map(user => <Member key={user.id} user={user} />)}
            </tbody>
        </table>
        </div>
    );
};

export default Members;
