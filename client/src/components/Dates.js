import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../auth';
import Date from './Date';

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

    return (
        <ul>
            {dates.map(date => (
                <>
                <Date
                    key={date.id}
                    dateId={date.id}
                    date={date.date.split(" ").slice(0, 4).join(" ")}
                    yesList={date.yes_list}
                    noList={date.no_list}
                />
                </>
            ))}
        </ul>
    )
}

export default Dates
