import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Form } from 'react-native';
// import { useHistory } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../auth'

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
});

const LogIn = props => {
    const [errors, setErrors] = useState([]);
    const { fetchWithCSRF, currentUser, setCurrentUser } = useContext(AuthContext);
    // let history = useHistory();

    const submitForm = async values => {
        console.log("line 13, top of submitForm")
        // e.preventDefault();
        console.log("line 15, after e.preventDefault()")
        const response = await fetchWithCSRF(`http://127.0.0.1:5000/api/session`, {
            method: 'PUT', headers: {"Content-Type": "application/json"},
            credentials: 'include', body: JSON.stringify({email: values.email, password: values.password})
        });
        console.log("line 20")
        console.log("response.ok is ", response.ok ? "true" : "false")
        const data = await response.json();
        console.log("line 23")
        setErrors(data.errors || []);
        if (response.ok) {
            console.log("response.ok was truthy");
            // console.log(data.current_user.email);
            setCurrentUser(data.current_user);
            // history.push('/')
        }
        if (!response.ok) console.log("!response.ok was falsy")
    }
    return (
        <View style={{flex: 1, justifyContent: "center"}}>
        <Formik
            initialValues={{email: "demo@aol.com", password: "password"}}
            onSubmit={submitForm}
            validationSchema={validationSchema}
        >
            {({handleChange, handleSubmit, errors}) => (
                <>
                <Text>Email address:</Text>
                <TextInput
                    textContentType="emailAddress"
                    onChangeText={handleChange("email")}
                />
                <Text>{errors.email}</Text>
                <Text>Password</Text>
                <TextInput
                    textContentType="password"
                    onChangeText={handleChange("password")}
                />
                <Text>{errors.password}</Text>
                <Button title={"Login"} onPress={handleSubmit} />
                </>
            )}
        </Formik>
        <Text>{currentUser ? currentUser.email : ""}</Text>
        </View>
    );
};
export default LogIn;
