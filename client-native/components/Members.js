import React, { useState, useContext, useEffect } from 'react';
import { Text, FlatList, SafeAreaView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
// import { useHistory } from 'react-router-dom';
import AuthContext from '../auth';
// import Member from './Member';
const CARTOON = `https://tennis-photos.s3.us-east-2.amazonaws.com/uploads/SatApr30643252021.png`


const Members = () => {
    const { fetchWithCSRF } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [, setErrors] = useState([]);
    const [, setMessages] = useState([]);

    const getUsers = async () => {
        const response = await fetchWithCSRF(`http://127.0.0.1:5000/api/users`);
        const data = await response.json();
        setErrors(data.errors || []);
        setMessages(response.messages || [])
        if (response.ok) setUsers(data.users);
    }
    useEffect(() => {
        getUsers();
    }, []);

    const renderItem = ({ item }) => (
      <ListItem bottomDivider>
        <Avatar rounded source={{uri: item.photo_url || CARTOON}} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
          <ListItem.Subtitle>{item.phone}</ListItem.Subtitle>
        </ListItem.Content>
        {/* <ListItem.Chevron /> */}
      </ListItem>
    );

    return (
        <SafeAreaView>
        <FlatList
            data={users}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}r
        />
        </SafeAreaView>
    )
};

export default Members;
