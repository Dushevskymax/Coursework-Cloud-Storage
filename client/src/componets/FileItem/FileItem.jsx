import React from "react";
import '../UI/icons/files/file/file.css';
import '../UI/icons/files/download/software-download.css';
import '../UI/icons/files/remove/file/file-remove.css'
import cl from './FileItem.module.css';

const FileItem = ({fileName, fileSize, itemPath, isSearchClicked, setItemToRemove, setFileNameToDownload}) => {
    if (!isSearchClicked) { return (
            <div className={cl.fcontainer}>
                <div className={cl.fname}>
                    <i className='gg_file'></i>
                    <div>
                        {fileName}
                    </div>
                </div>
                <div className={cl.fsize}>
                    {fileSize}
                </div>
                <div className={cl.fsave} onClick={() => setFileNameToDownload(fileName)}>
                    <i className='gg_software_download'></i>
                </div>
                <div className={cl.fremove} onClick={() => setItemToRemove(fileName)}>
                    <i className="gg-file-remove"></i>
                </div>
            </div>
        )
    } else { return (
            <div className={cl.searchedfcontainer}>
                <div className={cl.searchedfname}>
                    <i className="gg_file"></i>
                    <div>
                        {itemPath}
                    </div>
                </div>
            </div>
        )
    }
}

export default FileItem;