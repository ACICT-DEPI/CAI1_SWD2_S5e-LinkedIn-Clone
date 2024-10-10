import React from 'react'
import MessageContainer from './componenets/messages/MessageContainer'
import LefttSideBar from './componenets/lefttSideBar/LefttSideBar'


const MessagingPage = () => {
  return (
    <div className="bg-linkedinLightGray min-h-screen py-3 mt-16">
      <div className='w-3/4 mx-auto flex flex-col container md:flex-row items-start justify-evenly gap-5'>
          <LefttSideBar />
        <section className='w-full md:2/4 lg:w-3/4 mx-auto'>
          <MessageContainer />
        </section>
      </div>
      
      
    </div>
  )
}

export default MessagingPage
