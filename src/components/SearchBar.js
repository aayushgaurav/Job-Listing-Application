import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };
  
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for jobs (e.g. Java, React, Developer)"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;