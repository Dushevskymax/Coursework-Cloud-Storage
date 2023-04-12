import React from "react";
import '../search.css'
import cl from './Search.module.css';

const Search = ({isNewFolderClicked, setNewSearchState}) =>{
    return (
        <div className={cl.search_icon}>
            <i className="gg-search" onClick={() => {
                if (!isNewFolderClicked) {
                    setNewSearchState(true);
                }
            }}></i>
        </div>
    )
}

export default Search;