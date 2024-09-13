import React from 'react'
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const ResourcesPage = () => {
  const navigate = useNavigate();
  const handleDoBack = () => {
    navigate('/profile');
  };

  return (
    <div className='bg-linkedinLightGray min-h-screen py-3'>
      <div className='bg-white rounded-lg mt-3 w-1/2 mx-auto p-5'> 
      <div className='flex items-center gap-3'>
        <button
        onClick={handleDoBack}
        >
        <GoArrowLeft  className='text-5xl text-linkedinDarkGray p-2 hover:bg-linkedin-lighthover-gray hover:rounded-full' />
        </button>
        <h2 className='text-xl font-semibold text-linkedinDarkGray'>Resources</h2>
      </div>

      
      </div>
    </div>
  )
}

export default ResourcesPage
