import React from 'react';
import classes from './Menu.module.css';
import Menubar from '../Menubar/Menubar';

const Menu = ({isInFolder, currentPath, pathCallback, theme, changeTheme, setFileList, setNewFolderName,isSearchClicked,setNewSearchState,setItemToSearch}) =>{
    return (
        <div className={classes.menu}>
            <div className={classes.menu__items}>
                <Menubar isInFolder={isInFolder} currentPath={currentPath}
                    setNewPath={pathCallback} theme={theme} changeTheme={changeTheme}
                    setFileList={setFileList} setNewFolderName={setNewFolderName}
                    setItemToSearch={setItemToSearch} setNewSearchState={setNewSearchState}
                    isSearchClicked={isSearchClicked}
                />
            </div>
        </div>
    )
}

export default Menu;