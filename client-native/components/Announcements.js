import React, { useState, useContext } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Announcements = ({ currentUser }) => {
    return (
        <Text>{!currentUser || currentUser.photo_url ? null :
            `${currentUser.name}: Go to "Account Details" and upload a headshot.`}
        </Text>
    )
};
export default Announcements;
