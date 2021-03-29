import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
import AuthContext from '../auth';
import Single from './Single';

const Date = ({ date, yesList, noList, reservation }) => {
    // const [rerender, setRerender]=useState(false);
    // const [, setMessages]=useState([]);
    // const [, setErrors]   = useState([]);
    const { currentUser } = useContext(AuthContext);

    const onYesList = yesList.map(player => player.id).includes(currentUser.id);
    const onNoList  =  noList.map(player => player.id).includes(currentUser.id);
    const onAList = onYesList || onNoList;

    return (
        <li>
            <div>
                <h4>{date}</h4>
                <div>{onAList ? null :
                    <>
                        <span>I want to play</span>
                        <button onClick={() => reservation(false)}>doubles only</button>
                        <button onClick={() => reservation(true)}>singles or doubles</button>
                        <span> on this date.</span>
                    </>
                }</div>
                <div className="lists">
                    <div className="left-list">
                        <div>People who want to play:</div>
                        <ol>
                            {yesList.map((player, index) => (
                                <li>
                                    <Single key={player.id}
                                        player={player}
                                        reservation={reservation}
                                        singles={player.will_play_singles}
                                        scheduled={true}
                                        bubble={(yesList.length % 2) && index === yesList.length - 1}
                                    />
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div>
                        <div>People who've cancelled their reservation:</div>
                        {noList.map((player, index) => (
                            <div>
                                <Single
                                    key={player.id} player={player} reservation={reservation}
                                    bubble={(yesList.length % 2) && !index}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Date;
