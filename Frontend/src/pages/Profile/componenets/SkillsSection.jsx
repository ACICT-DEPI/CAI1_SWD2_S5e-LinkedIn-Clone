import React, { useEffect, useState } from "react";
import Section from "../../../components/common/Section";
import Button from "../../../components/common/Button";
import { IoMdClose } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { useAuthStore } from "../../../store/authStore";
import axios from 'axios'

const SkillsSection = () => {
  const {user , updateProfile} = useAuthStore();

  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    if (user && user.skills) {
      setSkills(user.skills);
    }
  }, [user]);

  // add new skill
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (skillInput.trim()) {
      try {
        const response = await axios.post('http://localhost:5001/api/users/skill', { name: skillInput });
        console.log("Skill added successfully:", response.data.skills);
        setSkills([...skills, response.data.skills[response.data.skills.length - 1]]);
        setSkillInput("");
        setShowModal(false);
      } catch (error) {
        console.error("Error adding skill:", error);
      }
    }
  };

  const handleDelete = async(index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    try {
    await updateProfile({ skills: updatedSkills });
    setSkills(updatedSkills);
  } catch (error) {
    console.error("Failed to update profile:", error);
  }
  };

  return (
    <Section>
      {skills.length === 0 ? (
        <div className="border-2 border-dashed border-linkedinBlue p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <h2 className="text-lg font-semibold text-linkedinDarkGray">Skills</h2>
            <button className="text-2xl text-linkedinDarkGray">
              <IoMdClose />
            </button>
          </div>
          <p className="text-sm text-linkedinGray mb-4">
            Communicate your fit for new opportunities – 50% of hirers use skills data to fill their roles.
          </p>
          <Button label="Add skills" styleType="outline" onClick={() => setShowModal(true)} />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-2">
            <h2 className="text-lg font-semibold text-linkedinDarkGray">Skills</h2>
            <button className="text-xl" onClick={() => setShowModal(true)}>
              <IoAddOutline />
            </button>
          </div>
          <ul className="list-disc my-4">
            {skills.map((skill, index) => (
              <li key={index} className="flex justify-between items-center mb-2 mb-4 border-b border-gray-200 pb-2">
                <span className="text-linkedinDarkGray">{skill.name}</span>
                <button
                  className="text-xl text-linkedinDarkGray"
                  onClick={() => handleDelete(index)}
                >
                  <IoMdClose />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-linkedinDarkGray">Add Skill</h2>
              <button className="text-3xl text-linkedinGray" onClick={() => setShowModal(false)}>
                <IoMdClose />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2 text-sm font-medium">Skill*</label>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Enter a skill"
                className="border p-2 w-full mb-4 text-linkedinDarkGray"
                required
              />
              <div className="flex justify-end space-x-4">
                <Button label="Cancel" styleType="outline" onClick={() => setShowModal(false)} />
                <Button label="Add Skill" styleType="primary" type="submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </Section>
  );
};

export default SkillsSection;
