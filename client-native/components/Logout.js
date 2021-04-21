import React, { useContext } from 'react';
import AuthContext from '../auth'

const Logout = props => {
    // const [errors, setErrors] = useState("");
    const { fetchWithCSRF, setCurrentUser } = useContext(AuthContext);
    const submitForm = async e => {
        // e.preventDefault();
        const response = await fetchWithCSRF('http://127.0.0.1:5000/api/session', {
            method: 'DELETE', credentials: 'include'
        });
        if (response.ok) setCurrentUser(null);
    }

    return (
        <form onSubmit={submitForm}>
            {/* {errors.map(err => <li key={err} >{err}</li>)} */}
            <button type="submit">Logout</button>
        </form>

    <SafeAreaView style={{flex: 1, justifyContent: "center"}}>
    <>
        <Formik
          initialValues={{ email: 'demo@aol.com', password: 'password' }}
          onSubmit={values => submitForm(values)}
          validationSchema={validationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Button onPress={handleSubmit} title={"Login"} />
                    <Text style={{color: "red"}}>{loginErrors[0]}.</Text>
                </SafeAreaView>
            )}
        </Formik>
        <MyModal visible={showInnerModal}>
            <Home setShowOuterModal={setShowInnerModal} />
        </MyModal>
    </>
    </SafeAreaView>
        );
    };
export default Logout;
