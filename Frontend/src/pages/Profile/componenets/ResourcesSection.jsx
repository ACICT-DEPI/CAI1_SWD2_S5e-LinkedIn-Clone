import React from 'react'
import { FaEye } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import saveIcon from '../../../assets/images/item-icon.svg'
import { useNavigate } from 'react-router-dom';

const ResourcesSection = ({isOwnProfile}) => {
  const navigate = useNavigate();

  const handleShowResources = () => {
    navigate('/resources');
  };

  return (
    isOwnProfile &&(
      <div div className='bg-white rounded-lg mt-3  w-[95%] md:w-[68%] mx-auto pt-5'>
      <h2 className='text-lg font-semibold px-5 text-linkedinDarkGray'>Resources</h2>
      <div className='flex items-center gap-2 px-5'>
        <FaEye className='text-linkedinsecondGray' />
        <p className='text-linkedinGray text-sm'>Private to you</p>
      </div>
      <div className='flex flex-col gap-3 my-5'>
        <div className='flex gap-5 px-5'>
          <BsPeopleFill className='text-2xl text-linkedinDarkGray'/>
          <div>
          <h3 className="text-base font-semibold md:block text-linkedinDarkGray">My network</h3>
              <p className="text-linkedinDarkGray">
              See and manage your connections and interests.
              </p>
          </div>
        </div>
        <hr />
        <div className='flex gap-5 px-5'>
          <img src={saveIcon} alt="saved items" className='h-5'/>
          <div>
          <h3 className="text-base font-semibold md:block text-linkedinDarkGray">Saved items</h3>
              <p className="text-linkedinDarkGray">
                Keep track of your jobs, courses, and articles.
              </p>
          </div>
        </div>
      </div>
      <hr />
      <button
        onClick={handleShowResources}
        className="w-full font-semibold p-2 rounded-lg hover:bg-linkedin-lighthover-gray text-linkedinsecondGray hover:text-linkedinDarkGray"
      >
        <div className='flex items-center justify-center gap-2 px-5'>
        <p className=''>Show all 4 resources</p>
        <FaArrowRight />
        </div>
        
      </button>
    </div>
    )
  )
}

export default ResourcesSection
