import React from "react";
import Errors from "../Errors/Errors";
import ItemList from "../ItemLIst/ItemList";

const InfoField  = ({errorMessageList, items, searchedItems, currentPath, setItemToRemove, setFileNameToDownload, isSearchClicked, setNewPath}) => {
    const notNullErrorMessageList =[];
    for (let i =0; i<errorMessageList.length; i++){
        if (errorMessageList[i]) {
            notNullErrorMessageList.push(errorMessageList[i]);
        }
    }
    return (
        <div>
            {notNullErrorMessageList.length != 0
                ?  <Errors errorsList={notNullErrorMessageList}/>
                :  <ItemList items={items} searchedItems={searchedItems} currentPath={currentPath} 
                    setItemToRemove={setItemToRemove} 
                    setFileNameToDownload={setFileNameToDownload} setNewPath={setNewPath} isSearchClicked={isSearchClicked}
                />
            }
        </div>
    )
}

export default InfoField;