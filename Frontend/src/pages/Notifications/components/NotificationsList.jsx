import React, { useState } from "react";
// import CommentNotification from "./CommentNotification";
import Section from "../../../components/common/Section";
import GenericNotification from "./GenericNotification";

const NotificationList = () => {
  const [isNotificationVisible, setNotificationVisible] = useState(true);

  const handleDeleteNotification = () => {
    console.log("delete logic here");
    setNotificationVisible(false);
  };
  var post = {
    creator: "Jane Smith",
    content:
      "Introducing 𝐅𝐀𝐑 𝐀𝐖𝐀𝐘: My Latest React Project 🥳 I’m excited to share 𝐅𝐀𝐑 𝐀𝐖𝐀𝐘, my 2nd React project designed to help travelers manage and track what they should pack💼. 𝑾𝒉𝒂𝒕 𝑰 𝑳𝒆𝒂𝒓𝒏𝒆𝒅 𝒇𝒓𝒐𝒎 𝑻𝒉𝒊𝒔 𝑷𝒓𝒐𝒋𝒆𝒄𝒕: 𝐂𝐨𝐦𝐩𝐨𝐧𝐞𝐧𝐭-𝐃𝐫𝐢𝐯𝐞𝐧 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐦𝐞𝐧𝐭: The importance of building reusable, scalable components to keep the codebase organized and maintainable. 𝐒𝐭𝐚𝐭𝐞 𝐌𝐚𝐧𝐚𝐠𝐞𝐦𝐞𝐧𝐭: How to efficiently manage state to ensure smooth and responsive user interactions. 𝐂𝐨𝐦𝐩𝐨𝐧𝐞𝐧𝐭 𝐂𝐨𝐦𝐩𝐨𝐬𝐢𝐭𝐢𝐨𝐧: Crafting a modular structure through smart component composition, leading to cleaner code and easier maintenance. 𝐇𝐨𝐨𝐤𝐬 𝐌𝐚𝐬𝐭𝐞𝐫𝐲: Leveraging React hooks for effective state management and handling side effects. I’d love to connect with others who are passionate about React and front-end development! hashtag#frontend hashtag#css hashtag#html hashtag#javascript hashtag#developer hashtag#programming hashtag#coding hashtag#webdeveloper hashtag#webdevelopment hashtag#webdesign hashtag#frontenddeveloper hashtag#code hashtag#programmer hashtag#coder hashtag#webdev hashtag#web hashtag#reactjs hashtag#softwaredeveloper hashtag#development hashtag#js hashtag#software hashtag#dev hashtag#developers hashtag#ui hashtag#ComponentDriven",
    avatar: "https://via.placeholder.com/150",
    comment: "Great work , keep it up ",
    timestamp: "2024-09-18 08:30 AM",
  };
  var post2 = {
    creator: "Aly Hany",
    content:
      "🚀 Hackathon Experience - Real-time System Monitoring and ML Visualization 🖥️Recently, I had the amazing opportunity to participate in the Fullstack Hackathon organized by SRM's Department of Computing Technologies. Alongside my talented teammates Suvan Gowri Shanker and Saransh Bangar, we tackled the challenge of creating a real-time system monitoring and machine learning training progress visualization web app for high-performance computing systems. 💻",
    avatar: "https://via.placeholder.com/150",
    comment: "very fruitful ",
    timestamp: "2024-09-18 08:30 AM",
  };
  // actions : just reposted , reacted to a post , loved your comment , comented
  return (
    <div className="border flex flex-col flex-wrap justify-start bg-linkedinWhite rounded-lg mt-4">
      {/* <CommentNotification post={post} onDelete={handleDeleteNotification} /> */}
      <GenericNotification
        post={post}
        onDelete={handleDeleteNotification}
        action="reacted to a post"
      />
      <GenericNotification
        post={post}
        onDelete={handleDeleteNotification}
        action="commented"
      />
      <GenericNotification
        post={post2}
        onDelete={handleDeleteNotification}
        action="just reposted"
      />
      <GenericNotification
        post={post2}
        onDelete={handleDeleteNotification}
        action="loved your comment"
      />
    </div>
  );
};

export default NotificationList;
