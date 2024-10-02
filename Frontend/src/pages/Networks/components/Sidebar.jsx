import React from 'react';
import { FaUserFriends, FaUsers, FaCalendarAlt, FaNewspaper, FaHashtag } from 'react-icons/fa';
import photo from "../../../assets/images/PhotoN.png"

const Sidebar = () => {
  return (
    <div className='mt-4 w-full md:2/4 lg:w-1/4 mx-auto '>
      <div className='bg-white rounded-lg p-5'>
        <h3 className='text-lg font-semibold pb-4 text-linkedinDarkGray'>Manage my network</h3>
        <hr />
        <ul className='space-y-4 pt-4 text-linkedinsecondGray'>
        <li className='flex items-center space-x-2'>
          <FaUserFriends />
          <span>Connections</span>
        </li>
        <li className='flex items-center space-x-2'>
          <FaUsers />
          <span>Following & followers</span>
        </li>
        <li className='flex items-center space-x-2'>
          <FaUsers />
          <span>Groups</span>
        </li>
        <li className='flex items-center space-x-2'>
          <FaCalendarAlt />
          <span>Events</span>
        </li>
        <li className='flex items-center space-x-2'>
          <FaNewspaper />
          <span>Newsletters</span>
        </li>
        <li className='flex items-center space-x-2'>
          <FaHashtag />
          <span>Hashtags</span>
        </li>
        </ul>
      </div>
      <div >
          <img src={photo}alt="" className="my-5 mx-auto w-3/4"/>
        </div>
    </div>
  );
};

export default Sidebar;
