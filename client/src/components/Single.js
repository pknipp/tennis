import React, { useContext, useEffect, useState, reservation } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../auth';

const Single = ({ player, reservation, singles }) => {
    const [, setMessages]=useState([]);
    const [, setErrors]   = useState([]);
    const { currentUser, fetchWithCSRF } = useContext(AuthContext)

    return (

        <>
            {(singles ? "*" : "") + player.name}
            {currentUser.id !== player.id ? null :
                <button onClick={() => reservation(player.will_play_singles)}>undo</button>
            }
        </>
    )
}

export default Single;
