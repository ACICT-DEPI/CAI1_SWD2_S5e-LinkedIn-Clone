import React, { useState } from "react";
import searchIcon from "../assets/images/nav/search-icon.svg";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch, filteredUsers }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Call the parent function to update the search term
  };

  const handleUserClick = (username, userId) => {
    navigate(`/profile/${userId}`);
    setSearchTerm(username); 
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative flex">
      <input
        type="text"
        placeholder="Search"
        className="border border-gray-300 rounded-md px-3 py-1.5 pl-10 mr-4 w-32 lg:w-48 transition-width duration-300 ease-in-out focus:w-72 text-black"
        value={searchTerm}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 1000)}
        onChange={handleChange}
      />
      <img
        src={searchIcon}
        alt="Search"
        className="absolute left-3 top-1/2 transform -translate-y-1/2"
      />
      {isDropdownOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {filteredUsers.length > 0 ? (
            <div>
              <ul className="max-h-48 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <li
                    key={user.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleUserClick(user.username, user._id)}
                  >
                    {user.firstName
                      ? `${user.firstName} ${user.lastName}`
                      : user.username}
                  </li>
                ))}
              </ul>
              <hr />
              <div className="flex justify-center py-2 hover:bg-gray-100">
                <Link
                  to="/searchAll"
                  className="text-blue-600 font-medium "
                  state={{ searchTerm }}
                >
                  See all results
                </Link>
              </div>
            </div>
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
