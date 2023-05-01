import React, { useEffect, useState } from 'react';
import classes from './WorkSpace.module.css';
import Path from './Path/Path';
import Loader from '../UI/Loader/Loader';
import { useFetching } from '../../hooks/useFetching';
import FileService from '../../API/file-service';
import Menu from '../UI/Menu/Menu';
import DirService from '../../API/dir-service';
import InfoField from './InfoField';


const WorkSpace = ({ theme, changeTheme }) => {

    const [fileToSend, setFileList] = useState({});
    const [data, setData] = useState({ path: '', files: [] });
    const [searchedItems, setSearchedItems] = useState({ items: [] });
    const [isIn, setIsInFolder] = useState(false);
    const [downloadFile, setFileNameToDownload] = useState('');
    const [itemToRemove, setItemToRemove] = useState('');
    const [filePath, setPath] = useState('/');
    const [folderName, setNewFolderName] = useState('');
    const [itemToSearch, setItemToSearch] = useState('');
    const [isSearchClicked, setNewSearchState] = useState(false);
    const [fetchData, isDataLoading, loadingError] = useFetching(async (filePath) => {
        const response = await FileService.getFiles(filePath);
        setData(response.data);
        response.data.path !== '/'
            ? setIsInFolder(true)
            : setIsInFolder(false)

    });

    const [fetchDownloadFile, isDownloading, downloadError] = useFetching(async (downloadFile, filePath) => {
        const response = await FileService.downloadSingleFile(downloadFile, filePath);
    });

    const [fetchUploadFile, isUploading, uploadError] = useFetching(async (fileToSend, filePath) => {
        const response = await FileService.uploadSingleFile(fileToSend, filePath);
        fetchData(filePath);
    });

    const [fetchRemoveItem, isRemoving, removeError] = useFetching(async (itemToRemove, filePath) => {
        const response = await DirService.removeItem(itemToRemove, filePath);
        fetchData(filePath);
    })

    const [fetchNewFolder, isCreating, createError] = useFetching(async (folderName, filePath) => {
        const response = await DirService.newFolder(folderName, filePath);
        fetchData(filePath);
    })

    const [fetchSearchedItem, isSearching, searchError] = useFetching(async (itemToSearch) => {
        const response = await DirService.searchItems(itemToSearch);
        if (response !== undefined) {
            setSearchedItems(response.data);
            console.log(response.data);
        }
    })

    useEffect(() => {
        fetchSearchedItem(itemToSearch);
    }, [itemToSearch])

    useEffect(() => {
        fetchRemoveItem(itemToRemove, filePath);
    }, [itemToRemove]);

    useEffect(() => {
        fetchData(filePath);
    }, [filePath])

    useEffect(() => {
        fetchDownloadFile(downloadFile, filePath)
    }, [downloadFile])

    useEffect(() => {
        fetchUploadFile(fileToSend, filePath);
    }, [fileToSend])

    useEffect(() => {
        fetchNewFolder(folderName, filePath);
    }, [folderName])
    return (
        <div>
            <Menu isInFolder={isIn} currentPath={filePath} pathCallback={setPath} theme={theme} changeTheme={changeTheme} setFileList={setFileList}
                setNewFolderName={setNewFolderName} setItemToSearch={setItemToSearch} setNewSearchState={setNewSearchState} isSearchClicked={isSearchClicked}
            />
            <div className={classes.workspace}>
                <div className={classes.workspace_block}>
                    <Path rootPath={data.path} />
                    {isDataLoading || isRemoving || isUploading || isCreating || isSearching
                        ? <Loader />
                        : <InfoField errorMessageList={[loadingError, downloadError, uploadError, removeError, createError, searchError]} items={data.files} searchedItems={searchedItems.items} currentPath={filePath}
                            setItemToRemove={setItemToRemove} setFileNameToDownload={setFileNameToDownload} setNewPath={setPath} isSearchClicked={isSearchClicked} />
                    }
                </div>
            </div>
        </div>

    )
}

export default WorkSpace;