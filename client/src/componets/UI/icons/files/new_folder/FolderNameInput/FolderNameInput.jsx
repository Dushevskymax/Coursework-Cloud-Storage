import React from "react";
import cl from './FolderNameInput.module.css';

function handler(newStateOfClicked,setNewFolderName) {
    const inp = document.getElementById('newFolderInput');
    inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            setNewFolderName(inp.value);
            newStateOfClicked(false);
        } else if (e.key === 'Escape') {
            newStateOfClicked(false);
        }
    })
}

const FolderNameInput = ({newStateOfClicked, setNewFolderName}) =>{
    return (
        <div>
            <input id='newFolderInput' className={cl.new_folder_name} onClick={() => handler(newStateOfClicked,setNewFolderName)}>
            </input>
        </div>
    )
}

export default FolderNameInput;