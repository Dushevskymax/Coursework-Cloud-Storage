import React, {useState} from "react";
import Arrows from "../icons/arrows/Arrows/Arrows";
import cl from'./Menubar.module.css';
import UploadFile from '../icons/files/upload/UploadFile/UploadFile';
import ThemeItem from "../icons/theme/ThemeItem/ThemeItem";
import NewFolder from '../icons/files/new_folder/NewFolder/NewFolder';
import FolderNameInput from "../icons/files/new_folder/FolderNameInput/FolderNameInput";
import Logout from "../icons/logout/Logout/Logout";
import SearchInput from "../icons/search/SearchInput/SearchInput";
import Search from "../icons/search/Search/Search";

const Menubar = ({isInFolder, currentPath, setNewPath, theme, changeTheme, setFileList, setNewFolderName,isSearchClicked ,setNewSearchState, setItemToSearch}) =>{
    const [isNewFolderClicked, setNewFolderState] = useState(false);
    return (
        <div className={cl.menu_bar}>
            <Arrows isInFolder={isInFolder} currentPath={currentPath} setNewPath={setNewPath}/>
            {isSearchClicked
                ?<SearchInput setNewSearchState={setNewSearchState} setItemToSearch={setItemToSearch}/>
                :<Search isNewFolderClicked={isNewFolderClicked} setNewSearchState={setNewSearchState}/>
            }
            <UploadFile setFileList={setFileList}/>
            {isNewFolderClicked
                ?<FolderNameInput newStateOfClicked={setNewFolderState} setNewFolderName={setNewFolderName}/>
                :<NewFolder isSearchClicked={isSearchClicked} newStateOfClicked={setNewFolderState}/>
            }
            <ThemeItem theme={theme} changeTheme={changeTheme}/>
            <Logout/>
        </div>
    )
}

export default Menubar