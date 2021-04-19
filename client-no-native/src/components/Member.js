import React, {useContext} from "react";
import AuthContext from '../auth';
const CARTOON = `https://tennis-photos.s3.us-east-2.amazonaws.com/uploads/SatApr30643252021.png`

const Member = ({user}) => {
    const { currentUser } = useContext(AuthContext)
    return (
        <tr>
            <td>{user.name}</td><td>{user.email}</td><td>{user.phone}</td>
            <td>
                {(!user.photo_url && currentUser.id === user.id) ?
                    <div
                        dangerouslySetInnerHTML={{__html:
                            'Please submit<br/>a photo via<br/>"Account Details."'
                        }}
                    />
                :
                    <img
                        className="small"
                        src={user.photo_url || CARTOON} alt={`headshot for ${user.name}`}
                    />
                }
            </td>
        </tr>
    )
}

export default Member;
