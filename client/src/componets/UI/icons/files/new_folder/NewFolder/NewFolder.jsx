import React from "react";
import '../folder-add.css';
import cl from './NewFolder.module.css';

const NewFolder = ({newStateOfClicked, isSearchClicked}) => {
    return ( 
        <div className={cl.new_folder}>
            <i className="gg-folder-add" onClick={() => {
                if (!isSearchClicked) {
                    newStateOfClicked(true);
                }
            }}></i>
        </div>
    )
}


export default NewFolder;