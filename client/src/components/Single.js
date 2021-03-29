import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
import AuthContext from '../auth';

const Single = ({ player, reservation, singles, scheduled, bubble }) => {
    // const [, setMessages]=useState([]);
    // const [, setErrors]   = useState([]);
    const { currentUser } = useContext(AuthContext)

    return (
        <>
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
        </>
    )
}

export default Single;
