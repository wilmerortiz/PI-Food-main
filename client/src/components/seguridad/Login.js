import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import './Login.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import { login } from "../../actions/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="text-error" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(username, password))
                .then(() => {
                    props.history.push("/users/profile");
                    window.location.reload();
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    if (isLoggedIn) {
        return <Redirect to="/users/profile" />;
    }

    return (
        <section className="login">
            <div className="card-login">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleLogin} ref={form}>
                    <div className={`wrap-input bg1`}>
                        <label htmlFor="username" className="label-input">User Name</label>
                        <Input type="text" name="username" className="input" id="username"
                               value={username}
                               onChange={onChangeUsername}
                               validations={[required]}/>
                    </div>

                    <div className={`wrap-input bg1`}>
                        <label htmlFor="password" className="label-input">Password</label>
                        <Input type="password" name="password" className="input" id="password"
                               value={password}
                               onChange={onChangePassword}
                               validations={[required]}/>
                    </div>

                    <div className="wrap-button" style={{width: '100%'}}>
                        <button className="btn btn-block" disabled={loading}>
                            {loading && (
                                <FontAwesomeIcon icon="fa-solid fa-circle-notch" />
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </section>
    );
};

export default Login;