import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

const RegistrationPage = () => {
    const {req, loading, error, clearError} = useHttp();
    const message = useMessage();
    const history = useHistory();
    const [user, setUser] = useState({
        username: '',
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

    const registerHandler = async () => {
        try {
            const data = await req ('/api/auth/register', 'POST', user);
            message(data.message);
            history.push("/login");
        } catch (e) {}
    };

    const handleKeypress = event => {
        if (event.key === "Enter") {
            registerHandler();
        }
    };

    return (
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Создать аккаунт</span>
                    <div className="input-field">
                        <input
                            id="username"
                            type="text"
                            onChange={changeHandler}
                            onKeyPress={handleKeypress}
                        />
                        <label htmlFor="username">Логин:</label>
                    </div>
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
                        onClick={registerHandler}
                        disabled={loading}
                    >
                        Создать
                    </button>
                </div>
            </div>
    )
};

export default RegistrationPage;


