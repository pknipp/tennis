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
                    <button onClick={() => reservation(false)}>undo</button>
                    {!scheduled ? null :
                        <button onClick={() => reservation(true)}>toggle *</button>
                    }
                </>
            }
        </li>
    )
}

export default Single;
