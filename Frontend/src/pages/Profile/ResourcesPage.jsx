import React from 'react'
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { BsPeopleFill } from "react-icons/bs";
import { RxActivityLog } from "react-icons/rx";
import saveIcon from '../../assets/images/item-icon.svg'
import personIcon from '../../assets/images/personIcon.svg'

const ResourcesPage = () => {
  const navigate = useNavigate();
  const handleDoBack = () => {
    navigate('/profile');
  };

  return (
    <div className='bg-linkedinLightGray min-h-screen py-3'>
      <div className='bg-white rounded-lg mt-24 w-1/2 mx-auto p-5'> 
        <div className='flex items-center gap-3'>
          <button
          onClick={handleDoBack}
          >
          <GoArrowLeft  className='text-5xl text-linkedinDarkGray p-2 hover:bg-linkedin-lighthover-gray hover:rounded-full' />
          </button>
          <h2 className='text-xl font-semibold text-linkedinDarkGray'>Resources</h2>
        </div>
      
        <div className='flex flex-col gap-3 my-5'>
          <div className='flex gap-5 px-5'>
            <BsPeopleFill className='text-xl text-linkedinDarkGray'/>
            <div>
              <h3 className='text-base font-semibold md:block text-linkedinDarkGray'>My network</h3>
              <p className='text-linkedinDarkGray'>See and manage your connections and interests.</p>
            </div>
          </div>
          <hr />
          <div className='flex gap-5 px-5'>
          <img src={personIcon} alt="saved items" className='w-5 h-10'/>
            <div>
              <h3 className='text-base font-semibold md:block text-linkedinDarkGray'>Personal demographic information</h3>
              <p className='text-linkedinDarkGray'>Add or manage your information.</p>
            </div>
          </div>
          <hr />
          <div className='flex gap-5 px-5'>
            <RxActivityLog className='text-xl text-linkedinDarkGray'/>
            <div>
              <h3 className='text-base font-semibold md:block text-linkedinDarkGray'>Activity</h3>
              <p className='text-linkedinDarkGray'>See what you've shared with your network, such as posts, articles, and comments.</p>
            </div>
          </div>
          <hr />
          <div className='flex gap-5 px-5'>
            <img src={saveIcon} alt="saved items" className='h-5'/>
            <div>
            <h3 className='text-base font-semibold md:block text-linkedinDarkGray'>Saved items</h3>
                <p className="text-linkedinDarkGray">
                  Keep track of your jobs, courses, and articles.
                </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ResourcesPage
