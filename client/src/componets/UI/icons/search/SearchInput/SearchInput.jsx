import React from "react";
import cl from './SearchInput.module.css';

function handler(setNewSearchState, setItemToSearch) {
    const inp = document.getElementById("searchInput");
    inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            setItemToSearch(inp.value);
        } else if (e.key === 'Escape') {
            setNewSearchState(false);
        }
    })
}

const SearchInput = ({setNewSearchState, setItemToSearch}) =>{
    return (
        <div>
            <input id="searchInput" className={cl.search_input} onClick={() => handler(setNewSearchState, setItemToSearch)}>
            </input>
        </div>
    )
}

export default SearchInput;