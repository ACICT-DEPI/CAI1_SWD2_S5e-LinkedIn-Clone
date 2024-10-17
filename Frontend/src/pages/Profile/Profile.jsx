import React, { useEffect, useState } from 'react';
import ProfileHeader from './componenets/ProfileHeader';
import AnalyticsSection from './componenets/AnalyticsSection'
import ResourcesSection from './componenets/ResourcesSection'
import AboutSection from './componenets/AboutSection';
import ActivitySection from './componenets/ActivitySection';
import ExperienceSection from './componenets/ExperienceSection';
import EducationSection from './componenets/EducationSection';
import SkillsSection from './componenets/SkillsSection';
import { useParams } from 'react-router-dom';
import { useViewProfile } from '../../store/useViewProfile';
import { useAuthStore } from '../../store/authStore';



const Profile = () => {
  // const [user,setUser] = useState([]);

  const { profileId  } = useParams(); 
  const { fetchUserProfile, viewedUser } = useViewProfile();
  const { user } = useAuthStore();

  const isOwnProfile = user.id === profileId;

  useEffect(() => {
    if (!isOwnProfile) {
      fetchUserProfile(profileId);
    }
  }, [profileId, isOwnProfile, fetchUserProfile]);

  return (
    <div className="bg-linkedinLightGray min-h-screen py-3 mt-16">
      <ProfileHeader isOwnProfile={isOwnProfile}/>
      <AboutSection isOwnProfile={isOwnProfile}/>
      <AnalyticsSection isOwnProfile={isOwnProfile}/>
      <ResourcesSection isOwnProfile={isOwnProfile}/>
      <ActivitySection user={user} isOwnProfile={isOwnProfile}/>
      <ExperienceSection isOwnProfile={isOwnProfile}/>
      <EducationSection isOwnProfile={isOwnProfile}/>
      <SkillsSection isOwnProfile={isOwnProfile}/>
    </div>
  );
}

export default Profile;
