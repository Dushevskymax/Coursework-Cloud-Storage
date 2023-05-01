import React, { useContext } from "react";
import cl from './Logout.module.css';
import '../log-off.css';
import AuthService from "../../../../../API/auth-service";
import { AuthorizationContext } from "../../../../../contexts/auth-context";

const Logout = () => {
    const redir = useContext(AuthorizationContext).nav;

    const onClickHandle = (e) => {
        AuthService.logout();
        redir('/login');
    }

    return (
        <div className={cl.log_off_container}>
            <i className="gg-log-off" onClick={onClickHandle} />
        </div>
    )
}

export default Logout;