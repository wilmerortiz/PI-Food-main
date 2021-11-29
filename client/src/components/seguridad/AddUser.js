import React, { useState, useRef, Component } from "react";
import Select from 'react-select'
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../../actions/auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const required = (value) => {
    if (!value) {
        return (
            <div className="text-error" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const options = [
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' },
    { value: 'user', label: 'User' }
]

const AddUser = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [user, setUser] = useState({
        roles : []
    });

    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }

    const handleChecked =  (e) => {
        //console.log(e.target.checked)
        let param = e.target.name
        if(e.target.checked){
            user[param].push(e.target.value)
        }else{
            let index = user[param].indexOf(e.target.value);

            if (index > -1) {
                user[param].splice(index, 1);
            }
        }

        setUser({
            ...user, [e.target.name]: user.roles
        })
    }

    const onChangeMultiple = (selectedOption, e) => {
        let param = e.name
        user[param] = [];
        selectedOption.map(op => {
            user[param].push(op.value)
        })

        setUser({
            ...user, [param]: user[param]
        })

    };

    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(register(user))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    };

    return(
        <section className={`container-user`}>

            <div className="form-register">
                <Form onSubmit={handleRegister} ref={form} className="form">

                    {!successful &&(
                        <div className="container-form">
                            <span className="form-title">
                                Register User
                            </span>
                            <div className={`wrap-input bg1`}>
                                <label htmlFor="first_name" className="label-input">First Name</label>
                                <Input type="text" name="first_name" className="input" id="first_name"
                                       value={user.first_name}
                                       onChange={handleChange}
                                       validations={[required]}/>
                            </div>
                            <div className={`wrap-input bg1`}>
                                <label htmlFor="last_name" className="label-input">Last Name</label>
                                <Input type="text" name="last_name" className="input" id="last_name"
                                       value={user.last_name}
                                       onChange={handleChange}
                                       validations={[required]}/>
                            </div>
                            <div className="wrap-form-checkbox mb-1" style={{padding: '0'}}>
                                <label className="label-input mb-1">Roles</label>
                                <Select
                                    options={options}
                                    isMulti
                                    name="roles"
                                    onChange={onChangeMultiple}
                                />
                                {/*
                                <div className={`roles`} style={{display: 'flex'}}>
                                    <div className="form-checkbox" >
                                        <input type="checkbox" className="input-checkbox cb-types" name="roles" value="admin" id={`role-admin`}
                                               onChange={handleChecked}/>
                                        <label htmlFor={`role-admin`} className="label-checkbox">Admin</label>
                                    </div>
                                    <div className="form-checkbox" >
                                        <input type="checkbox" className="input-checkbox cb-types" name="roles" value="moderator" id={`role-moderator`}
                                               onChange={handleChecked}/>
                                        <label htmlFor={`role-moderator`} className="label-checkbox">Moderator</label>
                                    </div>
                                    <div className="form-checkbox" >
                                        <input type="checkbox" className="input-checkbox cb-types" name="roles" value="user" id={`role-user`}
                                               onChange={handleChecked}/>
                                        <label htmlFor={`role-user`} className="label-checkbox">User</label>
                                    </div>
                                </div>
                                */}
                            </div>
                            <div className={`wrap-input bg1`}>
                                <label htmlFor="username" className="label-input">UserName</label>
                                <Input type="text" name="username" className="input" id="username"
                                       value={user.username}
                                       onChange={handleChange}
                                       validations={[required, vusername]}/>
                            </div>
                            <div className={`wrap-input bg1`}>
                                <label htmlFor="email" className="label-input">Email</label>
                                <Input type="email" name="email" className="input" id="email"
                                       value={user.email}
                                       onChange={handleChange}
                                       validations={[required, validEmail]}/>
                            </div>
                            <div className={`wrap-input bg1`}>
                                <label htmlFor="password" className="label-input">Password</label>
                                <Input type="password" name="password" className="input" id="password"
                                       value={user.password}
                                       onChange={handleChange}
                                       validations={[required, vpassword]}/>
                            </div>
                            <div className="container-form-btn">
                                <button className="btn-form" type="submit">
                                    <FontAwesomeIcon icon="fa-solid fa-floppy-disk" size="lg" /> &nbsp;  &nbsp; REGISTER
                                </button>
                            </div>
                        </div>)}
                    {message && (
                        <div className="div-alert">
                            <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </section>
    )
}

export default AddUser