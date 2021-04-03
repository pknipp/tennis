import React from "react";
import cartoon from "./cartoon.png";
const CARTOON = `https://tennis-photos.s3.us-east-2.amazonaws.com/uploads/SatApr30643252021.png`

const Member = ({user}) => (
    <tr>
        <td>{user.name}</td><td>{user.email}</td><td>{user.phone}</td>
        <td><img className="small" src={user.photo_url || CARTOON} /></td>
    </tr>
)

export default Member;
