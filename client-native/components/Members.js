import React, { useState, useContext, useEffect } from 'react';
import { Text } from 'react-native'
// import { useHistory } from 'react-router-dom';
import AuthContext from '../auth';
// import Member from './Member';


const Members = ({ setShowOuterModal }) => {
    const { fetchWithCSRF } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [, setErrors] = useState([]);
    const [, setMessages] = useState([]);
    // let history = useHistory();

    const getUsers = async () => {
        const response = await fetchWithCSRF(`http://127.0.0.1:5000/api/users`);
        const data = await response.json();
        setErrors(data.errors || []);
        setMessages(response.messages || [])
        if (response.ok) setUsers(data.users);
    }
    useEffect(() => {
        getUsers();
    }, []);

    return users.map(user => (<Text key={user.id}>{user.name}</Text>));
};

export default Members;
