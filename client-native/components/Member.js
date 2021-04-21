import React, {useContext} from "react";
import { View, Text, Image } from 'react-native';
import {ListItem, Avatar} from "react-native-elements";

import AuthContext from '../auth';
const CARTOON = `https://tennis-photos.s3.us-east-2.amazonaws.com/uploads/SatApr30643252021.png`

const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <Avatar source={{uri: item.photo_url}} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )

const Member = ({user}) => {
    console.log(user.photo_url);
    const { currentUser } = useContext(AuthContext)
    return (
        // <Image source={{ uri: CARTOON }} />
        // <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
        <Text>Hello {user.name}</Text>
            // <td>{user.name}</td><td>{user.email}</td><td>{user.phone}</td>
            //     {(!user.photo_url && currentUser.id === user.id) ?
            //         <div
            //             dangerouslySetInnerHTML={{__html:
            //                 'Please submit<br/>a photo via<br/>"Account Details."'
            //             }}
            //         />
            //     :
            //         <img
            //             className="small"
            //             src={user.photo_url || CARTOON} alt={`headshot for ${user.name}`}
    )
}

export default Member;
