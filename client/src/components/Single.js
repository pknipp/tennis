import React, { useContext, useEffect, useState, reservation } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../auth';

const Single = ({ player, reservation, singles, scheduled }) => {
    const [, setMessages]=useState([]);
    const [, setErrors]   = useState([]);
    const { currentUser, fetchWithCSRF } = useContext(AuthContext)

    return (

        <>
            {(singles && scheduled ? "*" : "") + player.name}
            {currentUser.id !== player.id ? null :
                <>
                <button onClick={() => reservation(false)}>undo</button>
                {scheduled ? <button onClick={() => reservation(true)}>toggle *</button> : null}
                </>
            }
        </>
    )
}

export default Single;
