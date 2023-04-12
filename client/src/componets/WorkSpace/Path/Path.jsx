import React from "react";
import classes from './Path.module.css';

const Path = ({rootPath}) => {
    
    return (
        <div className={classes.path__block}>
           <div className={classes.rootpath}>
                {rootPath
                    ? rootPath
                    : '/'
                }
            </div> 
        </div>
    )
}

export default Path;