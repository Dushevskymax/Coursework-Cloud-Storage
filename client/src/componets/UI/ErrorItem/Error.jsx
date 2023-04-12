import React from "react";
import cl from './Error.module.css';

const Error = ({errorMessage}) => {
    return (
        <div className={cl.erorr_msg}>
                <div>
                    Something wrong :(
                </div>
                <div>
                    {errorMessage}
                </div>
        </div>
    )
}

export default Error;