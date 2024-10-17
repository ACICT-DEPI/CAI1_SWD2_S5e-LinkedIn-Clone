import React, { useEffect, useState } from "react";
import "../../../assets/style/profile.css";
import Button from "../../../components/common/Button";
import { useAuthStore } from "../../../store/authStore";
import EditIcon from "../../../components/Icons/editIcon";
import ExperienceIcon from '../../../assets/images/ExperienceIcon.svg';
import EducationIcon from '../../../assets/images/EducationIcon.svg';
import defaultImage from '../../../assets/images/user.svg';
import defaultBG from "../../../assets/images/card-bg.svg";
import { useViewProfile } from "../../../store/useViewProfile";

const ProfileHeader = ({isOwnProfile}) => {
  const { user, updateProfile } = useAuthStore();
  const { viewedUser } = useViewProfile();
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [headline, setHeadline] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(defaultBG);
  const [newBackgroundImage, setNewBackgroundImage] = useState(null);

  useEffect(() => {
    const data = isOwnProfile ? user : viewedUser;
    if (data) {
      setProfileData(data);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setHeadline(data.headline);
      setProfileImage(data.profilePicture || defaultImage);
    }
  }, [user, viewedUser, isOwnProfile]);

  const firstEducation = profileData.education?.slice(-1)[0] || {};
  const firstExperience = profileData.experience?.slice(-1)[0] || {};
  
  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateProfile({
        firstName,
        lastName,
        headline,
        profilePicture: newProfileImage || profileImage,
        backgroundImage: newBackgroundImage || backgroundImage,
      }); 
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log("file",reader);
      
      reader.onloadend = () => {
        setNewProfileImage(reader.result);
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBackgroundImage(reader.result);
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <main className="bg-white rounded-lg w-1/2 mx-auto">
        {/* قسم التعديل */}
        {isEditing && (
          <div className="editing-section bg-gray-200 p-4 f z-20 w-full border rounded-lg ">
            <h2>Edit Profile</h2>
            <div className="flex flex-col mb-4">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border-2 rounded-lg px-3 mb-2"
                placeholder="First Name"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border-2 rounded-lg px-3 mb-2"
                placeholder="Last Name"
              />
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Edit your headline"
                className="border-2 rounded-lg px-3 mb-2"
              />
            </div>

            <div className="flex flex-col mb-4">
              <h3>Edit Profile Picture</h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
              <img src={profileImage} alt="Profile Preview" className="w-20 h-20 mt-2" />
            </div>

            <div className="flex flex-col mb-4">
              <h3>Edit Background Picture</h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundChange}
                className="mt-2"
              />
              <img src={backgroundImage} alt="Background Preview" className="w-20 h-20 mt-2" />
            </div>

            <Button label={isLoading ? "Saving..." : "Save"} onClick={handleSave} disabled={isLoading} />
          </div>
        )}

        <div className="hero">
          <div className="hero-banner cursor-pointer">
            <img src={backgroundImage} alt="Background" />
          </div>
          <div className="hero-avatar cursor-pointer">
            <img src={profileImage} alt="Profile" />
          </div>
        </div>

        <div className="flex items-center justify-between m-auto p-3">
          <div className="intro">
            {!isEditing ? (
              <div>
                <span className="intro-name">
                  {profileData.firstName} {profileData.lastName}
                </span>
                <span>{" ("}{profileData.username}{")"}</span>
                <div className="intro-desc">
                  <p>{profileData.headline}</p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex items-start gap-5 flex-col relative py-8 px-4">
            {isOwnProfile && (
                <div className="absolute right-0 top-0 cursor-pointer">
                  <Button
                    className="border-none"
                    icon={<EditIcon fill="white" />}
                    onClick={() => setIsEditing(!isEditing)}
                  />
                </div>
              )}
            <div className="flex gap-2 mt-6 cursor-pointer text-center justify-center">
              <img src={ExperienceIcon} alt="ExperienceIcon" className="w-8" />
              <h2 className="text-linkedinDarkGray mt-2">{firstExperience.title} </h2>
            </div>
            <div className="flex gap-2 cursor-pointer text-center justify-center">
              <img src={EducationIcon} alt="EducationIcon" className="w-8" />
              <h2 className="text-linkedinDarkGray mt-2">{firstEducation.school}</h2>
            </div>
          </div>
        </div>

        {isOwnProfile && (
          <div className="flex gap-2">
          <Button label="Open to" styleType="primary" className="w-53 h-9 font-bold " />
          <Button label="Add Profile section" styleType="default" className="w-99 h-9 text-linkedinBlue font-bold" />
          <Button label="More" styleType="default" className="w-53 h-9 font-bold" />
        </div>
        )}
      </main>
    </>
  );
};

export default ProfileHeader;
