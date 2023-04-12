import React from 'react';
import FolderItem from '../FolderItem/FolderItem';
import FileItem from '../FileItem/FileItem';
import cl from './ItemList.module.css';

const ItemList = ({currentPath,items, searchedItems, setNewPath, setItemToRemove, isSearchClicked, setFileNameToDownload}) => {
    const itemList = isSearchClicked ? searchedItems: items;
    return (
        <div className={cl.item_list_block}>
            {itemList.map((item) =>
               item.dir
                ? <FolderItem folderName={item.name} currentPath={currentPath} itemPath={item.path} setItemToRemove={setItemToRemove} setNewPath={setNewPath} isSearchClicked={isSearchClicked} key={item.name+Date.now()}/>
                : <FileItem fileName={item.name} itemPath={item.path} fileSize={item.size} setItemToRemove={setItemToRemove} setFileNameToDownload={setFileNameToDownload} isSearchClicked={isSearchClicked} key={item.name+Date.now()}/> 
            )}
        </div>
    )
}

export default ItemList;