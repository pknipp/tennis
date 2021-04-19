import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Form } from 'react-native';
// import { useHistory } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';

import AuthContext from '../auth';
import MyModal from './MyModal';
import Success from './Success';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
});

const LogIn = ({ setShowOuterModal }) => {
    const [errors, setErrors] = useState([]);
    const { fetchWithCSRF, currentUser, setCurrentUser } = useContext(AuthContext);
    const [showInnerModal, setShowInnerModal] = useState(false);
    // let history = useHistory();

    const submitForm = async values => {
        // e.preventDefault();
        console.log("line 24, before fetch");
        const response = await fetchWithCSRF(`http://127.0.0.1:5000/api/session`, {
            method: 'PUT', headers: {"Content-Type": "application/json"},
            credentials: 'include', body: JSON.stringify({email: values.email, password: values.password})
        });
        console.log("line 29, after fetch, where response.ok = ", response.ok ? "ok" : "not ok");
        const data = await response.json();
        console.log("line 31, after response.json()")
        setErrors(data.errors || []);
        if (response.ok) {
            setCurrentUser(data.current_user);
            setShowInnerModal(true);
        }
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
        <MyModal visible={showInnerModal}>
            <Success setShowOuterModal={setShowInnerModal} />
        </MyModal>
        </View>
    );
};
export default LogIn;
