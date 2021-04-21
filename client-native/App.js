import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Modal, SafeAreaView, Pressable } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import AuthContext from './auth';
import Login from './components/Login';
import Signup from './components/Signup';
import MyModal from './components/MyModal';
import Announcements from './components/Announcements';

const modals = ["login", "signup"];

export default function App() {
  const [showModal, setShowModal] = modals.reduce(([show, setShow], modal) => {
    [show[modal], setShow[modal]] = useState(false);
    return [show, setShow];
  }, [{}, {}]);
  const [fetchWithCSRF] = useState(() => fetch);
  const [currentUser, setCurrentUser] = useState(null);

  const authContextValue = {
    fetchWithCSRF,
    currentUser,
    setCurrentUser,
    Announcements
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <SafeAreaView style={styles.welcome}>
        <Text>Welcome to our tennis group's scheduler.</Text>
        <Pressable onPressIn={() => setShowModal.login(true)}>
            <View style={styles.pressView} >
                <MaterialCommunityIcons name={"login"} size={20} color={"#666"} style={{marginRight: 10}} />
                <Text style={styles.pressText}>Login</Text>
            </View>
        </Pressable>
        <Pressable onPressIn={() => setShowModal.signup(true)}>
            <View style={styles.pressView} >
                <FontAwesome name={"edit"} size={20} color={"#666"} style={{marginRight: 10}} />
                <Text style={styles.pressText}>Signup</Text>
            </View>
        </Pressable>
        <StatusBar style="auto" />
      </SafeAreaView>
      <MyModal visible={showModal.login}>
        <Login setShowOuterModal={setShowModal.login} />
      </MyModal>
      <MyModal visible={showModal.signup}>
        <Signup setShowOuterModal={setShowModal.signup} />
      </MyModal>

    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    // alignItems: "center",
  },
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
});
