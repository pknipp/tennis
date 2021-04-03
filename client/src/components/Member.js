import React from "react";
import cartoon from "./cartoon.png";

const Member = ({user}) => (
    <tr>
        <td>{user.name}</td><td>{user.email}</td><td>{user.phone}</td>
        <td><img className="small" src={user.photo_url || cartoon} /></td>
    </tr>
)

export default Member;
