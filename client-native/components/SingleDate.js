import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
import { Text, View } from 'react-native';

import AuthContext from '../auth';
import Single from './Single';

const SingleDate = ({ dateId, date, yesList, noList, reservation }) => {
    // const [rerender, setRerender]=useState(false);
    // const [, setMessages]=useState([]);
    // const [, setErrors]   = useState([]);
    const { currentUser } = useContext(AuthContext);

    const onYesList = yesList.map(player => player.id).includes(currentUser.id);
    const onNoList  =  noList.map(player => player.id).includes(currentUser.id);
    const onAList = onYesList || onNoList;

    return (
        <>
        <Text>{date}</Text>
        {/* <View>{onAList ? null :
            <>
                <span>I want to play</span>
                <button onClick={() => reservation(false)}>doubles only</button>
                <button onClick={() => reservation(true)}>singles or doubles</button>
                <span> on this date.</span>
            </>
        }</View> */}
        <View className="lists">
            <>
            <View className="left-list">
                <Text>People who want to play:</Text>
                    {yesList.map((player, index) => (
                        <Single key={`${dateId}y${player.id}`}
                            player={player}
                            reservation={reservation}
                            singles={player.will_play_singles}
                            scheduled={true}
                            bubble={(yesList.length % 2) && index === yesList.length- 1}
                        />
                    ))}
            </View>
            <View>
                <Text>People who've cancelled their reservation:</Text>
                    {noList.map((player, index) => (
                        // <Text>{player.name}</Text>
                        <Single
                            key={`${dateId}n${player.id}`} player={player} reservation={reservation}
                            bubble={(yesList.length % 2) && !index}
                        />
                    ))}
            </View>
            </>
        </View>
        </>
    )
}

export default SingleDate;
