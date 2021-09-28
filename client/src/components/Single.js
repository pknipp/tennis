import React, { useContext } from 'react';
import AuthContext from '../auth';

const Single = ({ player, reservation, singles, scheduled, bubble }) => {
    const { currentUser } = useContext(AuthContext);
    const CARTOON = `https://tennis-photos.s3.us-east-2.amazonaws.com/uploads/SatApr30643252021.png`
    const image =
        <img
            className='small'
            src={CARTOON} alt={'headshot for user'}
        />
    return (
        <li>
            {bubble ? "#" : null}
            <a href="#" className="ttip" data-toggle="tooltip" title="<image src='https://tennis-photos.s3.us-east-2.amazonaws.com/uploads/SatApr30643252021.png'>">
                {(singles && scheduled ? "*" : "") + player.name}
            </a>
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
