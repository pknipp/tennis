import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../auth';

const Date = ({ dateId, date, yesList, noList }) => {
    const [rerender, setRerender]=useState(false);
    const [showLineup, setShowLineup] = useState(false);
    const [, setMessages]=useState([]);
    const [, setErrors]   = useState([]);
    const { currentUser, fetchWithCSRF } = useContext(AuthContext)

    const postReservation = dateId => {
        (async _ => {
            const response = await fetchWithCSRF(`/api/reservations/${dateId}`, {
                method: 'POST',
            });
            const responseData = await response.json();
            if (!response.ok) setErrors(responseData.errors);
            if (responseData.messages) setMessages(responseData.messages)
            setRerender(!rerender);
        })();
    }

    const deleteReservation = dateId => {
        (async _ => {
            const response = await fetchWithCSRF(`/api/reservations/${dateId}`, {
                method: 'PUT',
            });
            const responseData = await response.json();
            if (!response.ok) setErrors(responseData.errors);
            if (responseData.messages) setMessages(responseData.messages)
            setRerender(!rerender);
        })();
    }

    return (
        <li>
            {date}
            <span>
                <button onClick={() => setShowLineup(!showLineup)}>
                    {showLineup ? "Hide " : "Show "}
                </button>
                <span padding-left={"10px"}> present lineup.</span>
            </span>
            {!showLineup ? null :
                <>
                    <h3>Want to play:</h3>
                    <ul>{yesList.map(player => <li>{player.name}</li>)}</ul>
                    <h3>Do not want to play:</h3>
                    <ul>{noList.map(player => <li>{player.name}</li>)}</ul>
                </>
            }
        </li>
    )
}

export default Date;
