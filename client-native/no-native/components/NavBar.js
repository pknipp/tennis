import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ currentUser }) => {
    const user = (
        <>
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
            <NavLink to="/edituser" activeClassName="active">Account Details</NavLink>
            <NavLink to="/members" activeClassName="active">Member List</NavLink>
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
            to the online scheduler for our tennis group.
        </h1>
        <div>{currentUser ? user : noUser}</div>
    </div>
)}
export default NavBar;
