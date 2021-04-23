import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, Image} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AuthContext from '../auth';
import MyModal from './MyModal';
import MyTextInput from './MyTextInput';
import Home from './Home';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    name: Yup.string().required().label("Nickname"),
    phone: Yup.string().required().min(10).label("Phone"),
    password: Yup.string().required().min(4).label("Password"),
    password2: Yup.string().required().min(4).label("Password confirmation")
});

const keys = ["email", "name", "phone"];

const Signup = () => {
    const { fetchWithCSRF, currentUser, setCurrentUser, showModal, setShowModal } = useContext(AuthContext);
    const myInitialValues = {};
    keys.forEach(key => (myInitialValues[key] = (currentUser ? currentUser[key] : '')));

    const [initialValues, setInitialValues] = useState({...myInitialValues, password: '', password2: ''});
    [showModal.home, setShowModal.home] = useState(false);
    const [signupErrors, setSignupErrors] = useState([]);
    const [render, setRender] = useState(false);

    const createUser = async values => {
        const response = await fetchWithCSRF(`http://127.0.0.1:5000/api/users`, {
            method: 'POST', headers: { "Content-Type": "application/json" },
            credentials: 'include', body: JSON.stringify(values)
        });
        const data = await response.json();
        setSignupErrors(data.errors || []);
        if (response.ok) {
            setCurrentUser(data.current_user);
            setShowModal.home(true);
            setRender(!render);
        }
    }

    const updateUser = async values => {
        const body = Object.entries(values).reduce((body, [key, value]) => ({...body, [key]: value}), {});
        const response = await fetchWithCSRF(`http://127.0.0.1:5000/api/users/${currentUser.id}`, {
            method: 'PUT', headers: {"Content-Type": "application/json"}, credentials:'include',
            body: JSON.stringify(values)
        });
        const data = await response.json();
        setSignupErrors(data.errors || []);
        // setMessages(data.messages || []);
        if (response.ok) {
            setCurrentUser(data.current_user);
            setShowModal.home(true);
            setRender(!render);
        }
    }

    const handleLogin = () => {
        setShowModal.signup(false);
        setShowModal.login(true);
        setRender(!render);
    }

    const cancel = () => setShowModal.home(true);

    return (
        <>
        <SafeAreaView style={{flex: 1, justifyContent: "center"}}>
            <>
                <Formik
                    enableReinitialize
                    initialValues={{...initialValues, password: '', password2: ''}}
                //   initialValues={{ email: , name: '', phone: '', password: '', password2: '' }}
                  onSubmit={values => (currentUser ? updateUser(values) : createUser(values))}
                  validationSchema={validationSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>

                            <MyTextInput
                                onChangeText={handleChange("email")}
                                label="Email"
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
                                onChangeText={handleChange("name")}
                                autoCapitalize="words"
                                value={values.name}
                                onBlur={handleBlur("name")}
                                keyboardType="default"
                                textContentType="name"
                                placeholder="Nickname (unique to group)"
                            />
                            <Text style={{color: 'red'}}>{errors.name}</Text>
                            <MyTextInput
                                 onChangeText={handleChange("phone")}
                                 autoCapitalize="none"
                                 value={values.phone}
                                 onBlur={handleBlur("phone")}
                                 keyboardType="phone-pad"
                                 textContentType="telephoneNumber"
                                 placeholder="Phone (w/area code)"
                            />
                            <Text style={{color: 'red'}}>{errors.phone}</Text>
                            <MyTextInput
                                onChangeText={handleChange("password")}
                                autoCapitalize="none"
                                value={values.password}
                                onBlur={handleBlur("password")}
                                keyboardType="visible-password"
                                textContentType="password"
                                placeholder="Password"
                                icon="lock"
                            />
                            <Text style={{color: 'red'}}>{errors.password}</Text>
                            <MyTextInput
                                onChangeText={handleChange("password2")}
                                autoCapitalize="none"
                                value={values.password2}
                                onBlur={handleBlur("password")}
                                keyboardType="visible-password"
                                textContentType="password"
                                placeholder="Confirm password"
                                icon="lock"
                            />
                            <Text style={{color: 'red'}}>{errors.password2}</Text>
                            <Button onPress={handleSubmit} title={currentUser ? "Submit changes" : "Create account"} />
                            {currentUser
                                ? <Button onPress={cancel} title={"Cancel"} />
                                : <Button onPress={handleLogin} title={"Switch to 'Login'"} />
                            }
                            <Text style={{color: "red"}}>{signupErrors[0]}.</Text>
                         </SafeAreaView>
                     )}
                 </Formik>
                 <MyModal visible={showModal.home}>
                     <Home />
                 </MyModal>
             </>
         </SafeAreaView>
         </>
    );
};
export default Signup;
