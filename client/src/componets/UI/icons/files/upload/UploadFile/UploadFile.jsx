import React from 'react';
import '../software-upload.css';
import cl from './UploadFile.module.css';

const handler = (e,setFileList) =>{
    setFileList(e.target.files[0]);
}

const createInput = (setFileList) =>{
    const inp = document.createElement('input');
    inp.setAttribute('type','file');
    inp.onchange = (e) => handler(e,setFileList);
    inp.click();
    inp.remove();
}

const UploadFile = ({setFileList}) => {
    
    return (
        <div className={cl.upload}>
                <i onClick={() => createInput(setFileList)} className='gg_software_upload'></i>
        </div>
    )
}

export default UploadFile;