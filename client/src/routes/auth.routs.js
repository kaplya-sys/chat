import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";

export const authRouts = () => {
    return (
        <Switch>
            <Route path="/login" component={LoginPage} exact>
                <LoginPage/>
            </Route>
            <Route path="/register" component={RegistrationPage} exact>
                <RegistrationPage/>
            </Route>
            <Redirect to="/login"/>
        </Switch>
    )
};