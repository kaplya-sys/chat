import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import ChatPage from "../pages/chatPage/ChatPage";
import ProfilePage from "../pages/ProfilePage";

export const siteRouts = () => {
    return (
        <Switch>
            <Route path="/chat" component={ChatPage} exact>
                <ChatPage/>
            </Route>
            <Route path="/profile/:id" component={ProfilePage} exact>
                <ProfilePage/>
            </Route>
            <Redirect to="/chat"/>
        </Switch>
    )
};