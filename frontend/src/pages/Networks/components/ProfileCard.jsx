import React, { useState } from 'react';
import { TiDelete } from "react-icons/ti";
import { IoPersonAdd, IoHourglassOutline } from "react-icons/io5";
import Button from '../../../components/common/Button';

const ProfileCard = ({ profile, handleIgnore }) => {
    const [isPending, setIsPending] = useState(false);

    const handleConnect = () => {
      setIsPending(!isPending); 
    };
    
  return (
    <div className='border rounded-lg shadow-md'>
      <div className='relative'>
        <img src="src/assets/images/card-bg.svg" alt="use photo" className='rounded w-full h-28 object-cover'/>
        <img src="src/assets/images/user.svg" alt="user photo" className='w-20 rounded-full -mt-10 ms-5'/>
        <button 
          className='absolute top-2 right-2 rounded-full text-3xl text-linkedinDarkGray hover:shadow-2xl' 
          onClick={() => handleIgnore(profile.id)}
        >
          <TiDelete />
        </button>
      </div>
      <h3 className='text-lg font-semibold px-4 mt-4 text-linkedinDarkGray text-center'>{profile.name}</h3>
      <p className='text-sm text-linkedinGray px-4 text-center'>{profile.desc}</p>
      <Button
        label={isPending ? "Pending" : "Connect"}
        icon={isPending ? <IoHourglassOutline /> : <IoPersonAdd />}
        styleType={isPending ? "default" : "outline"}
        className="w-3/4 mx-auto my-5 py-1"
        onClick={handleConnect}
      />
    </div>
  );
};

export default ProfileCard;
