import React from 'react'
import { FaCircleQuestion } from "react-icons/fa6";
import { RiArrowRightSLine } from "react-icons/ri";

const AnalyticsPage = () => {
  return (
    <div className='bg-linkedinLightGray min-h-screen py-3'>
      <div className='bg-white rounded-lg mt-3 w-1/2 mx-auto p-5'>
        <div className='flex items-center gap-2 '>
        <img src="src/assets/images/user.svg" alt="use photo" className='w-12 h-12 rounded-full'/>
          <div>
            <h2 className='text-xl font-semibold text-linkedinDarkGray'>Analytics & tools</h2>
            <p className='text-linkedinGray text-sm'>Friday, September 13</p>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg mt-3 w-1/2 mx-auto p-5'>
        <div className='flex items-center gap-1'>
        <h3 className='text-xl font-semibold text-linkedinDarkGray'>Analytics</h3>
        <FaCircleQuestion className='text-xs text-linkedinDarkGray hover:shadow-lg'/>
        </div>
        <div className='container flex flex-col mt-5 space-y-5 items-center md:flex-row md:space-y-0 md:gap-6'>
          <div className='md:w-1/2 border-1 border-linkedinGray shadow-md p-4 rounded'>
            <h4 className='text-linkedinDarkGray font-semibold'>0</h4>
            <p className='text-sm text-linkedinGray'>Post impressions</p>
            <p className='text-xs text-linkedinGray'>0% past 7 days</p>
          </div>
          <div className='md:w-1/2 border-1 border-linkedinGray shadow-md p-4 rounded'>
          <h4 className='text-linkedinDarkGray font-semibold'>0</h4>
            <p className='text-sm text-linkedinGray'>Followers</p>
            <p className='text-xs text-linkedinGray'>0% past 7 days</p>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg mt-3 w-1/2 mx-auto p-5'>
        <div className='mb-4'>
          <h3 className='text-xl font-semibold text-linkedinDarkGray'>Creation tools</h3>
          <p className='text-sm text-linkedinsecondGray'>
            Get more ways to start conversations with your community.{' '}
              <a href="#" className="text-linkedinBlue hover:underline">
                Learn more
            </a>{' '}
            about creation tool access.
          </p>
        </div>

        <div className='text-sm text-linkedinsecondGray flex justify-between mb-3'>
          <p>LinkedIn Live</p>
          <div className='flex'>
          <a href="">Learn More</a>
          <RiArrowRightSLine className='text-lg' />
          </div>
        </div>
        <hr />
        <div className='text-sm text-linkedinsecondGray flex justify-between mt-3'>
          <p>Audio Event</p>
          <div className='flex'>
          <a href="">Learn More</a>
          <RiArrowRightSLine className='text-lg' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
