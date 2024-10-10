import React from 'react'
import MessageContainer from './componenets/messages/MessageContainer'
import LefttSideBar from './componenets/lefttSideBar/LefttSideBar'


const MessagingPage = () => {
  return (
    <div className="bg-linkedinLightGray min-h-screen pt-16">
      <div className='w-3/4 mx-auto flex flex-col container md:flex-row items-start justify-evenly h-[85vh]'>
          <LefttSideBar />
        <section className='w-full md:1/2 lg:w-3/4 mx-auto h-[85vh]'>
          <MessageContainer />
        </section>
      </div>
      
      
    </div>
  )
}

export default MessagingPage
