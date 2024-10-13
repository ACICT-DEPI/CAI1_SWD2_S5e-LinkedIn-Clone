import React, { useEffect, useState } from 'react';
import ProfileHeader from './componenets/ProfileHeader';
import AnalyticsSection from './componenets/AnalyticsSection'
import ResourcesSection from './componenets/ResourcesSection'
import AboutSection from './componenets/AboutSection';
import ActivitySection from './componenets/ActivitySection';
import ExperienceSection from './componenets/ExperienceSection';
import EducationSection from './componenets/EducationSection';
import SkillsSection from './componenets/SkillsSection';
import { getUserPosts } from '../../utils/postApi';



const Profile = () => {
  const [posts,setPosts] = useState([]);
  const [user,setUser] = useState([]);
  useEffect(()=>{
    getUserPosts(setPosts,1,10);
  },[]);
  return (
    <div className="bg-linkedinLightGray min-h-screen py-3 mt-16">
      <ProfileHeader />
      <AboutSection />
      <AnalyticsSection />
      <ResourcesSection />
      <ActivitySection posts={posts} user={user} />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
    </div>
  );
}

export default Profile;
