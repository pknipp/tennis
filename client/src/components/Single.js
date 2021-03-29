import React, { useContext, useEffect, useState, reservation } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../auth';

const Single = ({ player, reservation }) => {
    const [, setMessages]=useState([]);
    const [, setErrors]   = useState([]);
    const { currentUser, fetchWithCSRF } = useContext(AuthContext)

    return (
        <li>
            {player.name}
            <button onClick={reservation}>
                undo
            </button>
        </li>
    )
}

export default Single;
