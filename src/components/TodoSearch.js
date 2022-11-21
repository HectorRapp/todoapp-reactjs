import React from "react";
import '../styles/TodoSearch.css'
import { TodoContext } from "./TodoContext";

function TodoSearch(){
    const { searchValue, setSearchValue } = React.useContext(TodoContext);

    const onSearchValueChanged = (event) => {
        console.log(event.target.value);
        setSearchValue(event.target.value);
    } 
    
    return (
        <input 
            className="TodoSearch" 
            placeholder="Cebolla"
            value = {searchValue}
            onChange={onSearchValueChanged}

        />
    );
}

export {TodoSearch};

