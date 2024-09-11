import React, { useState } from 'react';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

function SignUpDetailsPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <main className="flex-grow flex flex-col justify-center items-center bg-linkedinLightGray space-y-6">
      <h1 className="text-3xl text-gray-800 text-center">
      Make the most of your professional life
      </h1>
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-linkedinsecondGray">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-linkedinsecondGray">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
          </div>
          <Button label="Continue" styleType="primary" className="w-full"/>
        </form>
      </div>
    </main>
  );
}

export default SignUpDetailsPage;
