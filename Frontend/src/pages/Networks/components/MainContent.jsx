import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';

const MainContent = () => {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: 'Haneen Akrm',
      desc: 'SW | CS',
    },
    {
      id: 2,
      name: 'Mohamed Essam',
      desc: 'SW | CS',
    },
    {
      id: 3,
      name: 'Karem Akl',
      desc: 'SW | CS',
    },
    {
      id: 4,
      name: 'Amira Abdelaziz',
      desc: 'SW | CS',
    },
  ]);

  const handleIgnore = (id) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  return (
    <div className='bg-white rounded-lg mt-4 p-5'>
      <h2 className=' text-linkedinDarkGray'>People you may know </h2>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5'>
        {profiles.map((profile, index) => (
          <ProfileCard key={index} profile={profile} handleIgnore={handleIgnore}/>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
