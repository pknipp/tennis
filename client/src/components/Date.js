import React, { useContext, useEffect, useState, reservation } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../auth';
import Single from './Single';

const Date = ({ date, yesList, noList, reservation }) => {
    const [rerender, setRerender]=useState(false);
    const [showLineup, setShowLineup] = useState(false);
    const [, setMessages]=useState([]);
    const [, setErrors]   = useState([]);
    const { currentUser, fetchWithCSRF } = useContext(AuthContext);

    const onYesList = yesList.map(player => player.id).includes(currentUser.id);
    const onNoList  =  noList.map(player => player.id).includes(currentUser.id);
    const onAList = onYesList || onNoList;

    return (
        <li>
            {date}
            <div>
                <button onClick={() => setShowLineup(!showLineup)}>
                    {showLineup ? "Hide " : "Show "}
                </button>
                <span padding-left={"10px"}> present lineup.</span>
            </div>
            {!showLineup ? null :
                <>
                {onAList ? 'Click "undo" by your name below to toggle your expressed desire.' :
                    <><button onClick={reservation}>Click</button><span>if you want to play on this date.</span></>
                }
                <h3>Do want to play:</h3>
                <ul>{yesList.map(player => <Single key={player.id} player={player} reservation={reservation} />)}</ul>
                <h3>Do not want to play:</h3>
                <ul>{noList.map(player => <Single key={player.id} player={player} reservation={reservation} />)}</ul>
                </>
            }
        </li>
    )
}

export default Date;
