import React from 'react';
import "../assets/style/profile.css"
import Button from "../components/common/Button"
const ProfileHeader = () => {
  return (
    <div>
      <main>
  <div className="hero">
    <div className="hero-banner">
      <img src="src/assets/images/card-bg.svg" alt="" />
    </div>
    <div className="hero-avatar">
      <img src="src/assets/images/photo.svg" alt="" />
    </div>
  </div>
  <div className="intro">
    <div className="intro-name">User Name </div>
    <div className="intro-desc">
      <p>Full Stack Developer</p>
      <p>React | Node | Express | MongoDB</p>
    </div>
  </div>
  <div className='flex gap-2'>
  <Button label="Open to" styleType="primary" className="w-53 h-9 font-bold" />
  <Button label="Add Profile section" styleType="default" className="w-99 h-9 text-linkedinBlue	font-bold	" />
  <Button label="More" styleType="default" className="w-53 h-9 font-bold" />
  </div>
</main>

    </div>
  );
}

export default ProfileHeader;
