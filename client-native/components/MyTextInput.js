import React from 'react';
import { View, TextInput } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MyTextInput = ({ icon, ...otherProps }) => {
    return (
        <View style={{
            backgroundColor: "#ddd",
            borderRadius: 25,
            // flex: 1,
            flexDirection: "row",
            width: "100%",
            padding: 15,
            marginVertical: 10
        }} >
            {icon && <MaterialCommunityIcons name={icon} size={20} color={"#666"} style={{marginRight: 10}} />}
            <TextInput style={{
                    fontSize: 18,
                    fontFamily: Platform.OS === "Android" ? "Roboto" : "Avenir"
                }}
                {...otherProps} />
        </View>
    );
}

export default MyTextInput;
