import React, {useState, useContext} from "react"
import {Link} from "react-router-dom";
import cl from "./RegistrationForm.module.css";
import { AuthorizationContext } from "../../../contexts/auth-context";
import AuthService from "../../../API/auth-service";

const RegistrationForm = () => {

    const [formValue, setFormValue] = useState({email: '', nickname: '', password: '', repeatPassword: ''});
    const redir = useContext(AuthorizationContext).nav;

    const handleInput = (e) => {
        const {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
    }

    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        const response = await AuthService.registration({...formValue});
        if (response) {
            redir('/login');
        } else {
            alert("This user alredy exist");
        }
    }

    return (
        <div className={cl.reg_form_block}>
            <form onSubmit={handleFormSubmit} autoComplete="off">
                <div className={cl.reg_form}>
                    <div>
                        Registration
                    </div>
                    <div>
                        <input type="email" name="email" value={formValue.email} required="required" placeholder="Your email" onChange={handleInput}/>
                    </div>
                    <div>
                        <input type="text" name="nickname" value={formValue.nickname} required="required" placeholder="Your nickname" onChange={handleInput}></input>
                    </div>
                    <div>
                        <input name="password" type="password" value={formValue.password} autoComplete="new-password" minLength="8" maxLength="16" required="required" placeholder="Your password"  onChange={handleInput}></input>
                    </div>
                    <div>
                        <input name="repeatPassword" type="password" value={formValue.repeatPassword} minLength="8" maxLength="16" autoComplete="new-password" required="required" placeholder="Repeat password" onChange={handleInput}></input>
                    </div>
                    <div>
                        <button type="submit" className={cl.form_button}>Submit</button>
                    </div>
                    <div>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegistrationForm;