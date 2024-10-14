import React, { useEffect, useState } from "react";
import Section from "../../../components/common/Section";
import Button from "../../../components/common/Button";
import EducationIcon from '../../../assets/images/EducationIcon.svg';
import { IoMdClose } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { useAuthStore } from "../../../store/authStore";
import axios from 'axios'

const EducationSection = () => {
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from(new Array(50), (val, index) => 2024 - index);

  const {user, updateProfile} = useAuthStore();
  const [deleteIndex, setDeleteIndex] = useState(null); // state for delete index
  const [confirmModalOpen, setConfirmModalOpen] = useState(false); // State for confirmation modal
  const [education, setEducation] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); 
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    grade: "",
    activities: "",
    description: "",
  });

  useEffect(() => {
    if (user && user.education) {
      setEducation(user.education);
    }
  }, [user]);
  

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // edit
  const handleEdit = (index) => {
    setFormData(education[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  // submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // update
      const updatedEducation = [...education];
      updatedEducation[editingIndex] = formData;
      await updateProfile({ education: updatedEducation });
      setEducation(updatedEducation);
    } else {
      // add new
      const response = await axios.post("http://localhost:5000/api/users/education", formData);
      setEducation([...education, response.data.education[response.data.education.length - 1]]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      school: "",
      degree: "",
      fieldOfStudy: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      grade: "",
      activities: "",
      description: "",
    });
    setEditingIndex(null);
    setShowModal(false);
  };

  const handleDelete = async (index) => {
    setDeleteIndex(index);
    setConfirmModalOpen(true); 
  };

  const confirmDelete = async() => {
    if (deleteIndex !== null) {
      const updatedEducation = education.filter((_, i) => i !== deleteIndex);
      try {
        await updateProfile({ education: updatedEducation });
        setEducation(updatedEducation);
      }catch (error) {
        console.error("Failed to update profile:", error);
      }
    }
    setConfirmModalOpen(false); 
  };

  return (
    <Section>
      {education.length === 0 ? (
        <div className="border-2 border-dashed border-linkedinBlue p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <h2 className="text-lg font-semibold text-linkedinDarkGray">Education</h2>
            <button className="text-2xl text-linkedinDarkGray">
              <IoMdClose />
            </button>
          </div>
          <p className="text-sm text-linkedinGray">
            Show your qualifications and be up to 2X more likely to receive a recruiter InMail
          </p>
    
          <div className="flex items-center space-x-4 my-4">
            <img src={EducationIcon} alt="EducationIcon" className="w-8"/>
            <div className="text-gray-500">
              <p className="font-medium">School Name</p>
              <p>Degree, Field of Study</p>
              <p>2021 - 2025</p>
            </div>
          </div>
          <Button label="Add education" styleType="outline" onClick={() => setShowModal(true)} />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-2">
            <h2 className="text-lg font-semibold text-linkedinDarkGray">Education</h2>
            <button className="text-xl" onClick={() => setShowModal(true)}><IoAddOutline /></button>
          </div>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 border-b border-gray-200 pb-2">
              <div className="flex justify-between items-start mt-8">
                <div className="flex items-center space-x-4">
                  <img src={EducationIcon} alt="EducationIcon" className="w-8"/>
                  <div>
                    <h3 className="font-semibold text-linkedinDarkGray">{edu.school}</h3>
                    <p className="font-medium text-linkedinGray">{edu.degree}, {edu.fieldOfStudy}</p>
                    <p className="text-sm text-linkedinGray">
                      {edu.startMonth} {edu.startYear} - {edu.endMonth} {edu.endYear}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-xl text-linkedinDarkGray" onClick={() => handleEdit(index)}><MdOutlineEdit /></button>
                  <button className="text-xl text-linkedinDarkGray" onClick={() => handleDelete(index)}><IoMdClose /></button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white px-6 rounded-lg shadow-lg w-1/2 h-3/4 overflow-y-auto">
            <div className="sticky top-0 py-4 bg-white z-10 flex justify-between">
              <h2 className="text-lg font-semibold text-linkedinDarkGray mb-4">Add Education</h2>
              <button className="text-3xl text-linkedinGray" onClick={() => setShowModal(false)}>
                <IoMdClose />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="text-linkedinGray text-sm">
              <label className="block mb-2">School*</label>
              <input
                type="text"
                name="school"
                placeholder="School Name"
                className="border p-2 w-full mb-4 text-linkedinDarkGray"
                value={formData.school}
                onChange={handleChange}
                required
              />

              <label className="block mb-2">Degree*</label>
              <input
                type="text"
                name="degree"
                placeholder="Degree"
                className="border p-2 w-full mb-4 text-linkedinDarkGray"
                value={formData.degree}
                onChange={handleChange}
                required
              />

              <label className="block mb-2">Field of Study*</label>
              <input
                type="text"
                name="fieldOfStudy"
                placeholder="Field of Study"
                className="border p-2 w-full mb-4  text-linkedinDarkGray"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                required
              />

              <label className="block mb-2">Start Date*</label>
              <div className="flex space-x-4 mb-4">
                <select
                  name="startMonth"
                  className="border p-2 w-full  text-linkedinDarkGray"
                  value={formData.startMonth}
                  onChange={handleChange}
                  required
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <select
                  name="startYear"
                  className="border p-2 w-full text-linkedinDarkGray"
                  value={formData.startYear}
                  onChange={handleChange}
                  required
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <label className="block mb-2">End date (or expected)*</label>
              <div className="flex space-x-4 mb-4">
                <select
                  name="endMonth"
                  className="border p-2 w-full text-linkedinDarkGray"
                  value={formData.endMonth}
                  onChange={handleChange}
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <select
                  name="endYear"
                  className="border p-2 w-full text-linkedinDarkGray"
                  value={formData.endYear}
                  onChange={handleChange}
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <label className="block mb-2">Grade</label>
              <input
                type="text"
                name="grade"
                placeholder="Grade"
                className="border p-2 w-full mb-4 text-linkedinDarkGray"
                value={formData.grade}
                onChange={handleChange}
              />

              <label className="block mb-2">Activities and societies</label>
              <textarea
                name="Activities"
                placeholder="Activities and societies"
                className="border p-2 w-full mb-4 text-linkedinDarkGray"
                value={formData.activities}
                onChange={handleChange}
                rows="2"
              ></textarea>

              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                placeholder="Description"
                className="border p-2 w-full mb-4 text-linkedinDarkGray"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              ></textarea>

              <div className="flex space-x-4 justify-end pb-6">
                <Button 
                  label="Cancel" 
                  styleType="outline" 
                  onClick={() => setShowModal(false)} 
                />
                <Button 
                  label={editingIndex !== null ? "Save Changes" : "Add Education"} 
                  styleType="primary" 
                  type="submit" 
                />
              </div>
            </form>
          </div>
        </div>
      )}
      <ConfirmationModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this experience?"
      />
    </Section>
  );
};

export default EducationSection;

