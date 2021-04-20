import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Modal, SafeAreaView } from 'react-native';

import AuthContext from './auth';
import Login from './components/Login';
import MyModal from './components/MyModal';

export default function App() {
  const [showInnerModal, setShowInnerModal] = useState(false);
  const [fetchWithCSRF] = useState(() => fetch);
  const [currentUser, setCurrentUser] = useState(null);

  const authContextValue = {
    fetchWithCSRF,
    currentUser,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <SafeAreaView style={styles.welcome}>
        <Text>Welcome to our tennis group's scheduler.</Text>
        <Button title="Login" onPress={() => setShowInnerModal(true)} />
        <Button title="Signup" />
        <StatusBar style="auto" />
      </SafeAreaView>
      <MyModal visible={showInnerModal}>
        <Login setShowOuterModal={setShowInnerModal} />
      </MyModal>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    // alignItems: "center",
  },
});
