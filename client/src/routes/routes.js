import React from "react";
import {Route} from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";

export const useRoutes = isAuthenticated => {
    if(isAuthenticated) {
        return(
            <Route>
                <Navbar/>
            </Route>
        )
    } else {
        return (
            <Route>
                <Header/>
            </Route>
        )
    }
};