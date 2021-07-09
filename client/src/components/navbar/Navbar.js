import React, {useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {siteRouts} from "../../routes/site.routs";
import {AuthContext} from "../../context/AuthContext";
import {useProfile} from "../../hooks/profile.hook";
import './navbar.css';

const Navbar = () => {
    const data = useProfile();
    const routes = siteRouts();
    const history = useHistory();
    const {userId, logout} = useContext(AuthContext);
    const logoutHandler = event => {
        event.preventDefault();
        logout();
        history.push('/login');
    };

    return (
        <React.Fragment>
            <ul className="sidenav sidenav-fixed a-sidenav">
                <h4>WebChat</h4>
                <img className="circle responsive-img" src={`${data.avatar}`} alt=""/>
                <li className="bold"><NavLink to={'/chat'} className="waves-effect waves-orange">Чат</NavLink></li>
                <li className="bold"><NavLink to={`/profile/${userId}`} className="waves-effect waves-orange">Профиль</NavLink></li>
                <li className="bold last"><a href="/login" className="waves-effect waves-orange" onClick={logoutHandler}>Выйти</a></li>
            </ul>

            <main className="content">
                {routes}
            </main>
        </React.Fragment>
    )
};

export default Navbar;
