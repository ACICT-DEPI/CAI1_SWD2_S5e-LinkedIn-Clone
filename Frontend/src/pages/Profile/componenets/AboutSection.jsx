import React, { useEffect, useState } from "react";
import Section from "../../../components/common/Section";
import Button from "../../../components/common/Button";
import EditIcon from "../../../components/Icons/editIcon";
import LargeText from "../../../components/common/LargeText";
import { useAuthStore } from "../../../store/authStore";

function AboutSection() {
  const { user, updateProfile } = useAuthStore();
  const [about, setAbout] = useState(""); 
  const [tempAbout, setTempAbout] = useState(""); 
  const [btnClick, setBtnClick] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && user.about) {
      setAbout(user.about); 
      setTempAbout(user.about);
    }
  }, [user]);
  
  const handleSave = async () => {
    setIsLoading(true); // Indicate loading state
    try {
      console.log("tempAbout",tempAbout);
      await updateProfile({ about: tempAbout });
      setAbout(tempAbout); // Reflect changes locally
      setBtnClick(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating about section:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <Section>
      <div className="relative py-4">
        {/* Edit Button */}
        {!btnClick && about ? (
          <div className="absolute right-0 top-0">
            <Button className="border-none"
              icon={<EditIcon fill="white" />}
              onClick={() => setBtnClick(true)} // Enable edit mode
            />
          </div>
        ) : null}

        <p className="font-bold text-2xl pb-2">About</p>

        {/* About Text or Add Button */}
        {about === "" && !btnClick ? (
          <Button label={"Add Brief about yourself"} onClick={() => setBtnClick(true)} />
        ) : about.length > 100 ? (
          <LargeText description={about} style="" />
        ) : (
          <p className="text-lg">{about}</p>
        )}

        {/* Input Field for Editing */}
        {btnClick && (
          <div className="flex gap-3 py-3">
            <input
              type="text"
              value={tempAbout}
              className="border-2 rounded-lg w-full px-3"
              onChange={(event) => setTempAbout(event.target.value)}
            />
            <Button
              label={isLoading ? "Saving..." : "Save"}
              onClick={handleSave}
              disabled={isLoading}
            />
          </div>
        )}
      </div>
    </Section>
  );
}

export default AboutSection;