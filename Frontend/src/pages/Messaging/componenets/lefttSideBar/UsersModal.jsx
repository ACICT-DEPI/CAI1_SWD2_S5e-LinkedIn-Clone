import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useConversation from '../../../../store/useConversation';

const UsersModal = ({ onClose }) => {
  const [users, setUsers] = useState([]);
  const { setSelectedConversation } = useConversation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data.users);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedConversation(user); // Set selected user
    onClose(); // Close the modal
  };

  return (
    <div className="fixed left-8 bottom-16 bg-white border rounded shadow-lg max-h-80 overflow-y-auto z-50 w-64 p-2">
      <h2 className="text-xl font-bold mb-2">Select a User</h2>
      <div className="max-h-40 overflow-y-scroll">
        {users.map((user) => (
          <div 
            key={user._id} 
            onClick={() => handleUserSelect(user)} 
            className="cursor-pointer p-2 hover:bg-gray-200"
          >
            {user.username}
          </div>
        ))}
      </div>
      <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default UsersModal;
