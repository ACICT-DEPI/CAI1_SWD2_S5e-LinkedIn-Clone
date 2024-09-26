import React from 'react'
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

function MainLayput() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default MainLayput
