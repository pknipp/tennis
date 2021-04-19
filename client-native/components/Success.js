import React from 'react';
import { Button, View } from 'react-native';

import MyModay from './MyModal';

const Success = ({ setShowOuterModal }) => {
    return (
        <View style={{flex: 1, justifyContent: "center"}} >
            <Button title={"Success! Close this modal."} onPress={() => setShowOuterModal(false)} />
        </View>
)};

export default Success;
