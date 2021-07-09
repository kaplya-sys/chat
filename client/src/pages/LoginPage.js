import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

const LoginPage = () => {
    const auth = useContext(AuthContext);
    const {req, loading, error, clearError} = useHttp();
    const message = useMessage();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setUser({...user, [event.target.id]: event.target.value});
    };

    const loginHandler = async () => {
        try {
            const data = await req ('/api/auth/login', 'POST', user);
            auth.login(data.token, data.userId);
        } catch (e) {}
    };

    const handleKeypress = event => {
        if (event.key === "Enter") {
            loginHandler();
        }
    };


    return (
        <div className="card">
            <div className="card-content">
                <span className="card-title">Войти в систему</span>
                <div className="input-field">
                    <input
                        id="email"
                        type="email"
                        onChange={changeHandler}
                        onKeyPress={handleKeypress}
                    />
                    <label htmlFor="email">Email:</label>
                </div>
                <div className="input-field">
                    <input
                        id="password"
                        type="password"
                        onChange={changeHandler}
                        onKeyPress={handleKeypress}
                    />
                    <label htmlFor="password">Пароль:</label>
                </div>
            </div>
            <div className="card-action">
                <button
                    type="submit"
                    className="modal-action btn waves-effect"
                    onClick={loginHandler}
                    disabled={loading}
                >
                    Войти
                </button>
            </div>
        </div>
    )
}
    
export default LoginPage;