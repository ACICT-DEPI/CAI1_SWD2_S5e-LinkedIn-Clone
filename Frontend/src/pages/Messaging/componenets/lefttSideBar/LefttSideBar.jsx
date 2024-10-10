import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'


const FriendsList = () => {
  return (
    <div className="mt-4 w-full md:2/4 lg:w-1/4 mx-auto bg-white rounded-lg p-5">
      <SearchInput />
      <Conversations />
    </div>
  )
}

export default FriendsList
