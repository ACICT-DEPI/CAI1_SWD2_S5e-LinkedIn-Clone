import React from "react";
import ActivitySection from "../components/userComponents/ActivitySection";
import { Outlet } from "react-router-dom";
import AboutSection from "../components/userComponents/AboutSection";

function User() {
  return (
    <>
      <AboutSection />
      <ActivitySection />
      <div>user</div>
    </>
  );
}

export default User;
