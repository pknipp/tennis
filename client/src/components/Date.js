import React, { useContext, useEffect, useState, reservation } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../auth';
import Single from './Single';

const Date = ({ date, yesList, noList, reservation }) => {
    const [rerender, setRerender]=useState(false);
    const [, setMessages]=useState([]);
    const [, setErrors]   = useState([]);
    const { currentUser, fetchWithCSRF } = useContext(AuthContext);

    const onYesList = yesList.map(player => player.id).includes(currentUser.id);
    const onNoList  =  noList.map(player => player.id).includes(currentUser.id);
    const onAList = onYesList || onNoList;

    return (
        <li>
            <>
            <h4>{date}</h4>
            <div>{onAList ? null :
                <><button onClick={reservation}>Play me</button><span> on this date.</span></>
            }</div>
            <div>People who want to play:</div>
            <ol>{yesList.map(player => <li><Single key={player.id} player={player} reservation={reservation} /></li>)}</ol><br/>
            <div>People who have cancelled their reservation:</div>
            {noList.map(player => <div><Single key={player.id} player={player} reservation={reservation} /></div>)}
            </>
        </li>
    )
}

export default Date;
