import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';

import AuthContext from './auth';
import Login from './components/Login';
import MyModal from './components/MyModal';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [fetchWithCSRF] = useState(() => fetch);
  const [currentUser, setCurrentUser] = useState(null);

  const authContextValue = {
    fetchWithCSRF,
    currentUser,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <View style={styles.welcome}>
        <Text>Welcome to the tennis scheduler.</Text>
        <Button title="Login" onPress={() => setShowLogin(true)} />
        <Button title="Signup" />
        <StatusBar style="auto" />
      </View>
      <MyModal visible={showLogin}>
        <Login />
      </MyModal>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    // alignItems: "center",
  },
});
