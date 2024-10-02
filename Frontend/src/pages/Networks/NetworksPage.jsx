import React from 'react'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'

import Invitations from './components/Invitations'

const NetworksPage = () => {
  return (
    <div className='bg-linkedinLightGray min-h-screen py-3 '>
      <div className='w-3/4 mx-auto flex flex-col container md:flex-row items-start justify-evenly gap-5'>
          <Sidebar />
        <section className='w-full md:2/4 lg:w-3/4 mx-auto'>
          <Invitations/>
          <MainContent />
        </section>
      </div>
  </div>
  )
}

export default NetworksPage

