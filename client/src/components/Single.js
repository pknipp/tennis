import React, { useContext, useEffect, useState, reservation } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../auth';

const Single = ({ player, reservation }) => {
    const [, setMessages]=useState([]);
    const [, setErrors]   = useState([]);
    const { currentUser, fetchWithCSRF } = useContext(AuthContext)

    return (

        <>
            {player.name}
            {currentUser.id !== player.id ? null :
                <button onClick={reservation}>undo</button>
            }
        </>
    )
}

export default Single;
