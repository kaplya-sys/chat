import React, {useEffect, useState, useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {useProfile} from "../hooks/profile.hook";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

const ProfilePage = () => {
    const {token, userId} = useContext(AuthContext);
    const userData = useProfile();
    const {req, loading, error, clearError} = useHttp();
    const message = useMessage();
    const [image, setImage] = useState();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {;
        setUser({...user, [event.target.id]: event.target.value});
    };

    const updateHandler = async (event) => {
        if (image) {
            const formData = new FormData();
            formData.append('avatar', image);
            try {
                await fetch (`/api/profile/${userId}`, {
                    method: 'PATCH',
                    body: formData,
                    headers: {Authorization: token}
                });
            } catch (e) {}
        }
        try {
            const data = await req (`/api/profile/${userId}`, 'PATCH', user, {Authorization: token});
            message(data.message);
        } catch (e) {}
    }

    const handleKeypress = event => {
        if (event.key === "Enter") {
            updateHandler();
        }
    };

    return (
        <React.Fragment>
            <div className="page-title">
                <h4>
                    Профиль
                </h4>
            </div>

            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="username"
                                type="text"
                                className="validate"
                                onChange={changeHandler}
                                onKeyPress={handleKeypress}
                            />
                                <label htmlFor="username">Username: {userData.username}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="email"
                                type="email"
                                className="validate"
                                onChange={changeHandler}
                                onKeyPress={handleKeypress}
                            />
                                <label htmlFor="email">Email: {userData.email}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="password"
                                type="password"
                                className="validate"
                                onChange={changeHandler}
                                onKeyPress={handleKeypress}
                            />
                                <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="file-field input-field">
                        <div className="input-field col s4">
                            <div className="btn">
                                <span>File</span>
                                <input
                                    id="file"
                                    type="file"
                                    multiple
                                    onChange={(event) => setImage(event.target.files[0])}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" placeholder="Выберите файл"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="card-action">
                <button
                    type="submit"
                    className="modal-action btn waves-effect"
                    onClick={updateHandler}
                    disabled={loading}
                >
                    Изменить
                </button>
            </div>

        </React.Fragment>
    )
}

export default ProfilePage;