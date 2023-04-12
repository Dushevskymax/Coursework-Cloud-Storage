import React from "react";
import '../UI/icons/files/folder/folder.css';
import cl from './FolderItem.module.css';
import '../UI/icons/files/remove/folder/folder-remove.css';

const FolderItem = ({currentPath, folderName, itemPath, isSearchClicked, setItemToRemove, setNewPath}) => {
    if (!isSearchClicked) { return (
            <div className={cl.folcontainer}>
                <div className={cl.folname} onClick={() => setNewPath(currentPath+folderName+'/')}>
                    <i className="gg_folder"></i>
                    <div>
                        {folderName}
                    </div>
                </div>
                <div className={cl.folremove} onClick={() => setItemToRemove(folderName) }>
                    <i className="gg-folder-remove"></i>
                </div>
            </div>
        )
    } else { return (
            <div className={cl.searchedfolcontainer}>
                <div  className={cl.searchedfolname}>
                    <i className="gg_folder"></i>
                    <div>
                        {itemPath}
                    </div>
                </div>
            </div>
        )
    }
}

export default FolderItem;