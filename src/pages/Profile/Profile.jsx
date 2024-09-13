import React from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import AnalyticsSection from './componenets/AnalyticsSection'
import ResourcesSection from './componenets/ResourcesSection'


const Profile = () => {
  return (
    <div className='bg-linkedinLightGray min-h-screen py-3'>
      <ProfileHeader/>
      <AnalyticsSection />
      <ResourcesSection />
    </div>
  );
}

export default Profile;
