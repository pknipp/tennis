import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useHistory } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';

import AuthContext from '../auth';
import MyModal from './MyModal';
import MyTextInput from './MyTextInput';
import Dates from './Dates';
// import Success from './Success';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
});

const LogIn = ({ setShowOuterModal }) => {
    const [errors, setErrors] = useState([]);
    const { fetchWithCSRF, currentUser, setCurrentUser } = useContext(AuthContext);
    const [showInnerModal, setShowInnerModal] = useState(false);

    const submitForm = async values => {
        try {
            const response = await fetchWithCSRF(`http://127.0.0.1:5000/api/session`, {
                method: 'PUT', headers: {"Content-Type": "application/json"},
                credentials: 'include', body: JSON.stringify({email: values.email, password: values.password})
            });
            const data = await response.json();
            setErrors(data.errors || []);
            if (response.ok) {
                setCurrentUser(data.current_user);
                setShowInnerModal(true);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center"}}>
            <>
                <Formik
                  initialValues={{ email: 'demo@aol.com', password: 'password' }}
                  onSubmit={values => submitForm(values)}
                  validationSchema={validationSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <MyTextInput
                                onChangeText={handleChange("email")}
                                autoCapitalize="none"
                                value={values.email}
                                onBlur={handleBlur("email")}
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                placeholder="Email"
                                icon="email"
                            />
                            <Text style={{color: 'red'}}>{errors.email}</Text>
                            <MyTextInput
                                onChangeText={handleChange("password")}
                                autoCapitalize="none"
                                value={values.password}
                                onBlur={handleBlur("password")}
                                textContentType="password"
                                placeholder="Password"
                                secureTextEntry
                                icon="lock"
                            />
                            <Text style={{color: 'red'}}>{errors.password}</Text>
                            <Button onPress={handleSubmit} title={"Login"} />
                        </SafeAreaView>
                    )}
                </Formik>
                <Text>{currentUser ? currentUser.email : ""}</Text>
                <MyModal visible={showInnerModal}>
                    <Dates />
                </MyModal>
            </>
        </SafeAreaView>
    );
};
export default LogIn;
