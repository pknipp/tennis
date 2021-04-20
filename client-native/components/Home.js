import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import MyModal from './MyModal';
// import Success from './Success';
import Dates from './Dates';
import AuthContext from '../auth';

const Home = ({ setShowOuterModal }) => {
    const [showDatesModal, setShowDatesModal] = useState(false);
    const { currentUser, Announcements } = useContext(AuthContext);
    return (
        <>
        <View style={{flex: 1, justifyContent: "center"}} >
            <Announcements currentUser={currentUser} />
            <Button title="Dates" onPress={() => setShowDatesModal(true)} />
            <Text>Member List</Text>
            <Text>Account Details</Text>
            <Text>Logout</Text>
            <Button title={"Home! Close this modal."} onPress={() => setShowOuterModal(false)} />
        </View>
        <MyModal visible={showDatesModal}>
                    <Dates setShowOuterModal={setShowDatesModal} />
        </MyModal>
        </>
    )
};
export default Home;
