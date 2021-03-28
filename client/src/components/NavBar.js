import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ currentUser }) => {
    const user = (
        <>
            <NavLink to="/" activeClassName="active">Home</NavLink>
            <NavLink to="/edituser" activeClassName="active">Account Details</NavLink>
            <NavLink to="/logout" activeClassName="active">Log Out</NavLink>
        </>
    );
    const noUser = (
        <>
            <NavLink to="/login" activeClassName="active">Log In</NavLink>
            <NavLink to="/signup" activeClassName="active">Sign Up</NavLink>
        </>
    )
    return (
    <div className="nav-container">
        <h1>
            Welcome {(currentUser) ? `${currentUser.name} ` : ""}
            to the scheduler for our tennis group.
        </h1>
        <div>{currentUser ? user : noUser}</div>
    </div>
)}
export default NavBar;
