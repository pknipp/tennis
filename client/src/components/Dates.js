import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../auth';
import Date from './Date';

const Dates = () => {
    const [dates, setDates] = useState([]);
    const [rerender, setRerender]=useState(false);
    const [, setMessages]=useState([]);
    const [, setErrors]   = useState([]);
    const { currentUser, fetchWithCSRF } = useContext(AuthContext)

    const getDates = async () => {
        try {
            const res = await fetch(`/api/dates`)
            if (res.ok) {
                const data = await res.json();
                console.log(data.dates);
                setDates(data.dates);
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getDates();
    }, [rerender])

    const reservation = (dateId, toggleSingles) => {
        (async _ => {
            const response = await fetchWithCSRF(`/api/reservations/${dateId}`, {
                method: 'PUT', headers: { "Content-Type": "application/json" },
                credentials: 'include', body: JSON.stringify({ toggleSingles })
            });
            const responseData = await response.json();
            if (!response.ok) setErrors(responseData.errors);
            if (responseData.messages) setMessages(responseData.messages)
            setRerender(!rerender);
        })();
    }

    return (
        <>
        <div>
            If your name appears on the preference-list for any date below, you may toggle your preference for that date by clicking "undo" next to your name.
        </div>
        <div>
            <sup>*</sup>Indicates people willing to play singles.  Click "toggle *" below if you would like to toggle this preference.
        </div>
        <ul>
            {dates.map(date => (
                <>
                <Date
                    key={date.id}
                    dateId={date.id}
                    date={date.date.split(" ").slice(0, 4).join(" ")}
                    yesList={date.yes_list}
                    noList={date.no_list}
                    reservation={toggleSingles => reservation(date.id, toggleSingles)}
                /><br/>
                </>
            ))}
        </ul>
        </>
    )
}

export default Dates
