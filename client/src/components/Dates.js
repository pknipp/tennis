import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../auth';

const Dates = () => {
    const [dates, setDates] = useState([]);
    const [courseIds, setCourseIds] = useState([]);
    const [moreCourses, setMoreCourses] = useState([]);
    const [rerender, setRerender]=useState(false);
    const [showMoreCourses, setShowMoreCourses] = useState(false);
    const [, setMessages]=useState([]);
    const [, setErrors]   = useState([]);
    const { currentUser, fetchWithCSRF } = useContext(AuthContext)

    const getDates = async () => {
        try {
            const res = await fetch(`/api/dates`)
            if (res.ok) {
                const data = await res.json();
                setDates(data.dates);
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getDates();
    }, [rerender])

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
        <ul>
            {dates.map(date => (
                <li key={date.id}>
                    {date.date.split(" ").slice(0,4).join(" ")}
                </li>
            ))}
        </ul>
    )
}

export default Dates
