import React, { useState, useEffect } from "react";
import "../../../assets/style/profile.css";
import Button from "../../../components/common/Button";
import { useAuthStore } from "../../../store/authStore";
import EditIcon from "../../../components/Icons/editIcon";
import ExperienceIcon from "../../../assets/images/ExperienceIcon.svg";
import EducationIcon from "../../../assets/images/EducationIcon.svg";
import defaultImage from "../../../assets/images/user.svg";

const ProfileHeader = () => {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [headline, setHeadline] = useState(user.headline);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(
    user.profilePicture || defaultImage
  );
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(
    user.bannerImg || "src/assets/images/card-bg.svg"
  );
  const [newBackgroundImage, setNewBackgroundImage] = useState(null);

  const firstExperience = user.experience && user.experience.length > 0 ? user.experience[0] : null;
  const firstEducation = user.education && user.education.length > 0 ? user.education[0] : null;
  
  useEffect(() => {
    const savedProfileImage = localStorage.getItem("NewProfileImage");
    if (savedProfileImage) {
      setProfileImage(savedProfileImage); // تحميل الصورة المحفوظة من localStorage
    }

    const savedBackgroundImage = localStorage.getItem("NewBackgroundImage");
    if (savedBackgroundImage) {
      setBackgroundImage(savedBackgroundImage); // تحميل الخلفية المحفوظة من localStorage
    }
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("headline", headline);
      if (newProfileImage) {
        formData.append("profilePicture", newProfileImage);
      }
      if (newBackgroundImage) {
        formData.append("bannerImg", newBackgroundImage);
      }

      await updateProfile(formData, user._id); // تأكد أن ال API في السيرفر جاهز لاستقبال FormData

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
      reader.onloadend = () => {
        const base64Image = reader.result; // تحويل الصورة إلى Base64
        setNewProfileImage(base64Image);
        setProfileImage(base64Image);
        localStorage.setItem("NewProfileImage", base64Image); // حفظ الصورة في localStorage
      };
      reader.readAsDataURL(file); // قراءة الملف كـ Data URL (Base64)
    }
  };

  const handleBackgroundChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Background = reader.result; // تحويل الصورة إلى Base64
        setNewBackgroundImage(base64Background);
        setBackgroundImage(base64Background);
        localStorage.setItem("NewBackgroundImage", base64Background); // حفظ الصورة في localStorage
      };
      reader.readAsDataURL(file); // قراءة الملف كـ Data URL (Base64)
    }
  };

  return (
    <>
      <main className="bg-white rounded-lg w-1/2 mx-auto">
        {/* قسم التعديل */}
        {isEditing && (
          <div className="editing-section  z-20  border rounded-lg fixed  bg-white px-6 rounded-lg shadow-lg w-1/2 h-3/4 overflow-y-auto ">
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
              <img
                src={profileImage}
                alt="Profile Preview"
                className="w-20 h-20 mt-2"
              />
            </div>

            <div className="flex flex-col mb-4">
              <h3>Edit Background Picture</h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundChange}
                className="mt-2"
              />
              <img
                src={backgroundImage}
                alt="Background Preview"
                className="w-20 h-20 mt-2"
              />
            </div>

            <Button
              label={isLoading ? "Saving..." : "Save"}
              onClick={handleSave}
              disabled={isLoading}
            />
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
                  {user.firstName} {user.lastName}
                </span>
                <span>
                  {" ("}
                  {user.username}
                  {")"}
                </span>
                <div className="intro-desc">
                  <p>{user.headline}</p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex items-start gap-5 flex-col relative py-8 px-4">
            <div className="absolute right-0 top-0 cursor-pointer">
              <Button
                className="border-none"
                icon={<EditIcon fill="white" />}
                onClick={() => setIsEditing(!isEditing)}
              />
            </div>

            <div className="flex gap-2 mt-6 cursor-pointer text-center justify-center">
              <img src={ExperienceIcon} alt="ExperienceIcon" className="w-8" />
              <h2 className="text-linkedinDarkGray mt-2">
                {firstExperience
                  ? `${firstExperience.title} at ${firstExperience.company}`
                  : "No experience added"}
              </h2>
            </div>
            <div className="flex gap-2 cursor-pointer text-center justify-center">
              <img src={EducationIcon} alt="EducationIcon" className="w-8" />
              <h2 className="text-linkedinDarkGray mt-2">
                {firstEducation
                  ? `${firstEducation.school} - ${firstEducation.fieldOfStudy}`
                  : "No education added"}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            label="Open to"
            styleType="primary"
            className="w-53 h-9 font-bold "
          />
          <Button
            label="Add Profile section"
            styleType="default"
            className="w-99 h-9 text-linkedinBlue font-bold"
          />
          <Button
            label="More"
            styleType="default"
            className="w-53 h-9 font-bold"
          />
        </div>
      </main>
    </>
  );
};

export default ProfileHeader;
