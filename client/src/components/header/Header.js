import React from 'react';
import {NavLink} from "react-router-dom";
import {authRouts} from "../../routes/auth.routs";
import './header.css';


const Header = () => {
    const routes = authRouts();

    return (
        <React.Fragment>
            <nav>
                <div className="nav-wrapper teal darken-1">
                    <NavLink to="/" className="brand-logo">WebChat</NavLink>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/login">Вход</NavLink></li>
                        <li><NavLink to="/register">Регистрация</NavLink></li>
                    </ul>
                </div>
            </nav>

            <div className="auth-block">
                {routes}
            </div>
        </React.Fragment>
    )
};

export default Header;
