import React, { useState } from 'react';
import SearchInput from './SearchInput';
import Conversations from './Conversations';
import UsersModal from './UsersModal';
import { FaUsers } from 'react-icons/fa'; 
const LefttSideBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUsersModal, setShowUsersModal] = useState(false); 

  // search input
  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase()); 
  };

  // Function to toggle UsersModal
  const toggleUsersModal = () => {
    setShowUsersModal((prev) => !prev);
  };

  return (
    <div className="relative mt-4 w-full lg:w-1/3 mx-auto bg-white border-b md:border-r p-5 h-full overflow-y-auto">
      <SearchInput onSearch={handleSearch} />
      <Conversations searchTerm={searchTerm} />

      {/* Fixed Icon */}
      <FaUsers
        className="fixed left-8 bottom-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
        onClick={toggleUsersModal}
      />

      {/* Render UsersModal */}
      {showUsersModal && <UsersModal onClose={toggleUsersModal} />}
    </div>
  );
};

export default LefttSideBar;






//new
// import { useState } from 'react';
// import SearchInput from './SearchInput';
// import Conversations from './Conversations';
// import UsersModal from './UsersModal';

// const LefttSideBar = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showUsersModal, setShowUsersModal] = useState(false); // State to control modal visibility

//   const handleSearch = (term) => {
//     setSearchTerm(term.toLowerCase());
//   };

//   return (
//     <div className="mt-4 w-full lg:w-1/3 mx-auto bg-white border-b md:border-r p-5 h-full flex flex-col relative"> {/* Make position relative */}
//       <SearchInput onSearch={handleSearch} />
//       <Conversations searchTerm={searchTerm} />
//       <div className="flex items-center mt-auto"> {/* Flex container for alignment */}
//         <button 
//           className="flex items-center space-x-2" 
//           onClick={() => setShowUsersModal(true)}
//         >
//           <i className="fas fa-users"></i> {/* Example icon */}
//           <span>Show All Users</span>
//         </button>
//         {showUsersModal && <UsersModal onClose={() => setShowUsersModal(false)} />}
//       </div>
//     </div>
//   );
// };

// export default LefttSideBar;
