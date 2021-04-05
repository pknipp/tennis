import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import EditUser from './components/EditUser';
import Dates from './components/Dates';
import Members from './components/Members';
import ProtectedRoute from "./components/ProtectedRoute"
import AuthRoute from "./components/AuthRoute"
import AuthContext from './auth';

const App = _ => {
    const [fetchWithCSRF] = useState(() => fetch);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const authContextValue = {
        fetchWithCSRF,
        currentUser,
        setCurrentUser
    };

    useEffect(() => {
        // console.log("ue in App.js");
        (async () => {
            const response = await fetch('/restore');
            const data = await response.json();
            setCurrentUser(data.current_user);
            setLoading(false);
        })()
    }, [])

    return (
        <AuthContext.Provider value={authContextValue}>
            {loading ?
                <h1>Loading</h1>
            :
                <BrowserRouter>
                    <NavBar currentUser={currentUser} />
                    <Switch>
                        <AuthRoute exact path="/login" component={LogIn} />
                        <AuthRoute exact path="/signup" component={SignUp} />
                        <ProtectedRoute exact path="/logout" component={LogOut} currentUser={currentUser} />
                        <ProtectedRoute exact path="/edituser" component={EditUser} currentUser={currentUser} />
                        <ProtectedRoute exact path="/" component={Dates} />
                        <ProtectedRoute exact path="/members" component={Members} />
                    </Switch>
                    <span>
                        <br/><br/>
                        creator:
                        <a href="https://pknipp.github.io/" target="_blank">Peter Knipp</a>
                    </span>
                </BrowserRouter>
            }
        </AuthContext.Provider>
    );
}

export default App;
