import React, { useState } from 'react';
import SearchInput from './SearchInput';
import Conversations from './Conversations';

const LefttSideBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search input
  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase()); // Convert to lowercase for case-insensitive search
  };

  return (
    <div className="mt-4 w-full lg:w-1/3 mx-auto bg-white border-b md:border-r p-5 h-full overflow-y-auto">
      <SearchInput onSearch={handleSearch} />
      <Conversations searchTerm={searchTerm} />
    </div>
  );
};

export default LefttSideBar;
