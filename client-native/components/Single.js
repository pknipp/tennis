import React, { useContext } from 'react';
import { Text } from 'react-native';
import AuthContext from '../auth';

const Single = ({ player, reservation, singles, scheduled, bubble }) => {
    const { currentUser } = useContext(AuthContext)
    return (
        <Text>
            {bubble ? "#" : null}
            {(singles && scheduled ? "*" : "") + player.name}
            {/* {currentUser.id !== player.id ? null :
                <>
                    <button onClick={() => reservation(false)}>undo</button>
                    {!scheduled ? null :
                        <button onClick={() => reservation(true)}>toggle *</button>
                    }
                </>
            } */}
        </Text>
    )
}

export default Single;
