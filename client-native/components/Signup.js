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

const Signup = ({ setShowOuterModal }) => {
    const { fetchWithCSRF, setCurrentUser } = useContext(AuthContext);
    const [signupErrors, setSignupErrors] = useState([]);
    const [showInnerModal, setShowInnerModal] = useState(false);

    const submitForm = async values => {
        const response = await fetchWithCSRF(`http://127.0.0.1:5000/api/users`, {
            method: 'POST', headers: { "Content-Type": "application/json" },
            credentials: 'include', body: JSON.stringify({ email: values.email, name: values.name, phone: values.phone, password: values.password, password2: values.password2 })
        });
        const data = await response.json();
        setSignupErrors(data.errors || []);
        if (response.ok) {
            setCurrentUser(data.current_user);
            setShowInnerModal(true);
        }
    }

    return (
        <>
        <Text>Hello world.</Text>
        <SafeAreaView style={{flex: 1, justifyContent: "center"}}>
            <>
                <Formik
                  initialValues={{ email: '', name: '', phone: '', password: '', password2: '' }}
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
                             <Button onPress={handleSubmit} title={"Create account"} />
                             <Text style={{color: "red"}}>{signupErrors[0]}.</Text>
                         </SafeAreaView>
                     )}
                 </Formik>
                 <MyModal visible={showInnerModal}>
                     <Home setShowOuterModal={setShowInnerModal} />
                 </MyModal>
             </>
         </SafeAreaView>
         </>
    );
};
export default Signup;
