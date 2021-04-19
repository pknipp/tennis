import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth';
import SingleDate from './SingleDate';

const Dates = () => {
    const [dates, setDates] = useState([]);
    const [today, setToday] = useState(null);
    const [rerender, setRerender]=useState(false);
    const [bubble, setBubble] = useState(false);
    const [, setMessages]=useState([]);
    const [, setErrors]   = useState([]);
    const { currentUser, setCurrentUser, fetchWithCSRF } = useContext(AuthContext)

    const getDates = async () => {
        try {
            const res = await fetch(`/api/dates`)
            if (res.ok) {
                const data = await res.json();
                setDates(data.dates);
                setToday(new Date(data.today));
                setCurrentUser(data.current_user);
                setBubble(data.dates.reduce((bubble, date) => (
                    // "bubble/hook" exists iff there is an odd number of players on a date
                    bubble || (date.yes_list.length % 2)
                ), false));
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getDates();
    }, [rerender])

    const reservation = async (dateId, toggleSingles) => {
        const response = await fetchWithCSRF(`/api/reservations/${dateId}`, {
            method: 'PUT', headers: { "Content-Type": "application/json" },
            credentials: 'include', body: JSON.stringify({ toggleSingles })
        });
        const data = await response.json();
        setErrors(data.errors || []);
        setMessages(data.messages || []);
        setRerender(!rerender);
    }

    return (
        <>
            <h3>{currentUser.photo_url ? null :
                'Please go to "Account Details" and upload a headshot.'}
            </h3>
            <div>
                If your name appears on the preference-list for any date below, you may toggle your preference for that date by clicking <button disabled>undo</button> next to your name.
            </div>
            <div>
                <sup>*</sup>This indicates people willing to play singles on  the particular date.  Click <button disabled>toggle *</button> below if you would like to change your preference for this.
            </div>
            {!bubble ? null :
                <div>
                    <sup>#</sup>This person/people is/are either "on the bubble" (if they were the last one to make a reservation) or "on the hook" (if they were the last one to cancel a reservation) because of the odd number of people presently in the lineup.
                </div>
            }
            <ul>
                {dates.filter(date => new Date(date.date) >= today).map(date => (
                    <SingleDate
                        key={date.id}
                        dateId={date.id}
                        date={date.date.split(" ").slice(0, 4).join(" ")}
                        yesList={date.yes_list}
                        noList={date.no_list}
                        reservation={toggleSingles => reservation(date.id, toggleSingles)}
                    />
                ))}
            </ul>
        </>
    )
}

export default Dates
