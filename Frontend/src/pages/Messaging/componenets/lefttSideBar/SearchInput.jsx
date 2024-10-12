import { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass the value to parent
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search messages"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none bg-linkedin-lighthover-blue"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchInput;
