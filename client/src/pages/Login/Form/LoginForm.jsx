import cl from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthorizationContext } from "../../../contexts/auth-context";
import AuthService from "../../../API/auth-service";

const LoginForm = () => {

    const [formValue, setFormValue] = useState({ email: '', password: '' });
    const redir = useContext(AuthorizationContext).nav;
    const setUser = useContext(AuthorizationContext).setUserData;
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const userData = await AuthService.login({...formValue});
        if (userData) {
            setUser(userData);
            redir('/');
        } else {
            alert("Error: User doesn't exist");
        }
    }

    return (
        <div className={cl.login_form_block}>
            <form onSubmit={handleFormSubmit} autoComplete="off">
                <div className={cl.login_form}>
                    <div>
                        Login
                    </div>
                    <div>
                        <input name="email" type="email" value={formValue.email} required="required" onChange={handleInput} placeholder="Email"></input>
                    </div>
                    <div>
                        <input name="password" autoComplete="new-password" type="password"  required="required"minLength="8" maxLength="32" value={formValue.password} onChange={handleInput} placeholder="Password"></input>
                    </div>
                    <div>
                        <button className={cl.form_button} type="submit">Submit</button>
                    </div>
                    <div>
                        <Link to="/registration">Registration</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;