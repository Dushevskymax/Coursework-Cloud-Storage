import React from 'react';
import cl from './Loader.module.css';

const Loader = () => {
    return (
       <div className={cl.loader}>
        <div className={cl.lds_ellipsis}><div></div><div></div><div></div><div></div></div>
        </div> 
    )
}

export default Loader;