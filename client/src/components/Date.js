import React, { useContext } from 'react';
import AuthContext from '../auth';
import Single from './Single';

const Date = ({ dateId, date, yesList, noList, reservation }) => {
    const { currentUser } = useContext(AuthContext);
    const onYesList = yesList.map(player => player.id).includes(currentUser.id);
    const onNoList  =  noList.map(player => player.id).includes(currentUser.id);

    return (
        <li>
            <h4>{date}</h4>
            <div>{onYesList || onNoList ? null :
                <>
                    <span>I want to play</span>
                    <button onClick={() => reservation(false)}>doubles only</button>
                    <button onClick={() => reservation(true)}>singles or doubles</button>
                    <span> on this date.</span>
                </>
            }</div>
            <div className="lists">
                <div className="left-list">
                    <div><i>People who want to play:</i></div>
                    <ol>
                        {yesList.map((player, index) => (
                            <Single
                                key={`${dateId}y${player.id}`}
                                player={player}
                                reservation={reservation}
                                singles={player.will_play_singles}
                                scheduled={true}
                                bubble={(yesList.length % 2) && index === yesList.length- 1}
                            />
                        ))}
                    </ol>
                </div>
                <div>
                    <div><i>People who've cancelled their reservation:</i></div>
                    <ul>
                        {noList.map((player, index) => (
                            <Single
                                key={`${dateId}n${player.id}`}
                                player={player}
                                reservation={reservation}
                                bubble={(yesList.length % 2) && !index}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </li>
    )
}

export default Date;
