import React from 'react';
import SearchInput from './SearchInput';
import Conversations from './Conversations';

const LefttSideBar = () => {
  return (
    <div className="mt-4 w-full lg:w-1/3 mx-auto bg-white border-b md:border-r p-5 h-full overflow-y-auto">
      <SearchInput />
      <Conversations />
    </div>
  );
};

export default LefttSideBar;
