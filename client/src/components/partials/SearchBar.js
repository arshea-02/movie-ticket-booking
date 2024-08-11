import { useState } from "react"


const SearchBar = ({ onSearch }) =>{
    const [searchInput, setSearchInput] = useState('');

    const handleChange = (e) =>{
        setSearchInput(e.target.value);
    }

    return(
        <div className="search">
            <input type='text' placeholder="search movie" value={searchInput} onChange={handleChange}/>
        </div>
    )
}

export default SearchBar;
