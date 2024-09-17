import React from 'react';
import ProfileHeader from './componenets/ProfileHeader';
import AnalyticsSection from './componenets/AnalyticsSection'
import ResourcesSection from './componenets/ResourcesSection'
import AboutSection from './componenets/AboutSection';
import ActivitySection from './componenets/ActivitySection';


const Profile = () => {
  return (
    
    <div className="bg-linkedinLightGray min-h-screen py-3 mt-16">
      <ProfileHeader />
      <AnalyticsSection />
      <ResourcesSection />
      <AboutSection />
      <ActivitySection />
    </div>
  );
}

export default Profile;
