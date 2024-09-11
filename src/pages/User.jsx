import React from 'react'
import ActivitySection from '../components/ActivitySection';
import { Outlet } from 'react-router-dom';

function User() {
  return (
    <>
      <ActivitySection/>
      <div>user</div>
    </>
  );
}

export default User
