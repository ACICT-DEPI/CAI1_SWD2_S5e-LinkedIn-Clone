import React, { useState } from 'react';
import Button from '../../../components/common/Button';

const Invitations = () => {
  // Sample fake invitations data
  const [invitations, setInvitations] = useState([
    {
      id: 1,
      name: 'Mostafa Shaheen',
      title: 'CS Grad | Junior Penetration Tester | Trainee @ NTI',
      connections: '85 others',
      imageUrl: 'https://via.placeholder.com/40',
    },
    {
      id: 2,
      name: 'Mahmoud Roka',
      title: '--',
      connections: '39 others',
      imageUrl: 'https://via.placeholder.com/40',
    },
    {
      id: 3,
      name: 'Mohamed Ali',
      title: 'Mathematician',
      connections: '107 others',
      imageUrl: 'https://via.placeholder.com/40',
    },
  ]);

  // Handle Ignore button
  const handleIgnore = (id) => {
    setInvitations(invitations.filter(invite => invite.id !== id));
  };

  // Handle Accept button
  const handleAccept = (id) => {
    setInvitations(invitations.filter(invite => invite.id !== id));
  };

  return (
    <div className="bg-white rounded-lg md:mt-4 p-5">
      <p className="text-linkedinDarkGray font-semibold mb-2">Invitations</p>
      <hr />
      {invitations.length === 0 ? (
        <p className="text-linkedinDarkGray mt-2">No pending invitations</p>
      ) : (
        invitations.map((invite) => (
          <div key={invite.id} className="flex justify-between items-center my-4">
            <div className="flex items-center gap-3">
              <img src={invite.imageUrl} alt={invite.name} className="w-10 h-10 rounded-full" />
              <div>
                <h4 className="font-semibold text-linkedinDarkGray">{invite.name}</h4>
                <p className="text-sm text-linkedinGray">{invite.title}</p>
                <p className="text-xs text-linkedinGray">Connected with {invite.connections}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleIgnore(invite.id)}
                className=" text-linkedinDarkGray"
              >
                Ignore
              </button>
              <Button
                label="Accept"
                styleType="outline"
                onClick={() => handleAccept(invite.id)}
                className=" w-3/4 mx-auto my-5 py-0.5 "
                />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Invitations;
