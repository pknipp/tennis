import React, { useState, useContext } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Announcements = currentUser => {
    return (
        <Text>{currentUser.photo_url ? null :
            'Please go to "Account Details" and upload a headshot.'}
        </Text>
    )
};
export default Announcements;
