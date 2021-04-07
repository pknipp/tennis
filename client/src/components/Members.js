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

    const getUsers = async () => {
        const response = await fetchWithCSRF(`/api/users`);
        const data = await response.json();
        setErrors(data.errors || []);
        setMessages(response.messages || [])
        if (response.ok) setUsers(data.users);
    }
    useEffect(() => {
        getUsers();
    }, []);

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
