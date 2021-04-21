import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, Image, Pressable } from 'react-native';
import { MaterialCommunityIcons, Fontisto, FontAwesome } from '@expo/vector-icons';

import MyModal from './MyModal';
// import Success from './Success';
import Dates from './Dates';
import Members from './Members';
import AuthContext from '../auth';

const modals = ["dates", "members", "accountDetails"];

const Home = ({ setShowOuterModal }) => {
    const { fetchWithCSRF, currentUser, setCurrentUser, Announcements } = useContext(AuthContext);
    const [showModal, setShowModal] = modals.reduce(([show, setShow], modal) => {
        [show[modal], setShow[modal]] = useState(false);
        return [show, setShow];
    }, [{}, {}]);

    const logout = async () => {
        // e.preventDefault();
        const response = await fetchWithCSRF('http://127.0.0.1:5000/api/session', {
            method: 'DELETE', credentials: 'include'
        });
        if (response.ok) {
            setCurrentUser(null);
            setShowOuterModal(false);
        }
    }

    return (
        <>
        <View style={{flex: 1, justifyContent: "center"}} >
            <Announcements currentUser={currentUser} />
            <Pressable onPressIn={() => setShowModal.dates(true)}>
                <View style={styles.pressView} >
                    <Fontisto name={"date"} size={20} color={"#666"} style={{marginRight: 10}} />
                    <Text style={styles.pressText}>Dates</Text>
                </View>
            </Pressable>
            <Pressable onPressIn={() => setShowModal.members(true)}>
                <View style={styles.pressView} >
                    <FontAwesome name={"list"} size={20} color={"#666"} style={{marginRight: 10}} />
                    <Text style={styles.pressText}>Members List</Text>
                </View>
            </Pressable>
            <Pressable onPressIn={() => setShowModal.accountDetails(true)}>
                <View style={styles.pressView} >
                    <MaterialCommunityIcons name={"account"} size={20} color={"#666"} style={{marginRight: 10}} />
                    <Text style={styles.pressText}>Account Details</Text>
                </View>
            </Pressable>
            <Pressable onPressIn={logout}>
                <View style={styles.pressView} >
                    <MaterialCommunityIcons name={"logout"} size={20} color={"#666"} style={{marginRight: 10}} />
                    <Text style={styles.pressText}>Logout</Text>
                </View>
            </Pressable>
            <Button title={"Home! Close this modal."} onPress={() => setShowOuterModal(false)} />
        </View>
        <MyModal visible={showModal.dates}>
                    <Dates setShowOuterModal={setShowModal.dates} />
        </MyModal>
        <MyModal visible={showModal.members}>
                    <Members setShowOuterModal={setShowModal.members} />
        </MyModal>
        </>
    )
};
const styles = {
    pressText:{
        fontSize: 18,
        fontFamily: Platform.OS === "Android" ? "Roboto" : "Avenir",
    },
    pressView: {
        backgroundColor: "#ddd",
        borderRadius: 25,
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        padding: 15,
        marginVertical: 10,
    },
}
export default Home;
