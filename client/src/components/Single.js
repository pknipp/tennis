import React, { useContext } from 'react';
import AuthContext from '../auth';

const Single = ({ player, reservation, singles, scheduled, bubble }) => {
    const { currentUser } = useContext(AuthContext)
    return (
        <li>
            {bubble ? "#" : null}
            {(singles && scheduled ? "*" : "") + player.name}
            {currentUser.id !== player.id ? null :
                <>
                    <button onClick={() => reservation(false)}>toggle preference</button>
                    {!scheduled ? null :
                        <button onClick={() => reservation(true)}>toggle singles*</button>
                    }
                </>
            }
        </li>
    )
}

export default Single;
