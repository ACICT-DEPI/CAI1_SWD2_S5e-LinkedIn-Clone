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
