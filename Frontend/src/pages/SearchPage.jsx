import React, { useEffect, useState } from "react";
import Section from "../components/common/Section";
import { useLocation } from "react-router-dom";
import axios from "axios";
import userIcon from "../assets/images/nav/user.svg";
import { Link } from "react-router-dom";
const SearchPage = () => {
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || "";
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const page = 1;
      const limit = 10;
      try {
        const response = await axios.get(`http://localhost:5000/api/users`, {
          params: {
            search: searchTerm,
            page,
            limit,
          },
        });

        const { users } = response.data;
        console.log(response.data);

        setSuggestedUsers(users);
        const initialStatus = users.reduce((acc, user) => {
          console.log(user.connectionStatus);

          acc[user._id] = user.connectionStatus;
          return acc;
        }, {});
        setConnectionStatus(initialStatus);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    };
    fetchData();
  }, [searchTerm]);
  const sendConnectionRequest = async (userId) => {
    try {
      const currentStatus = connectionStatus[userId];
      console.log(currentStatus);

      if (currentStatus === "connect") {
        // Send a connection request
        const response = await axios.post(
          "http://localhost:5000/api/connections",
          {
            receiverId: userId,
          }
        );
        console.log(" request :", response);
        console.log("Connection request sent:", response.data);
        // Update the connection status to "pending"
        setConnectionStatus((prevStatus) => ({
          ...prevStatus,
          [userId]: "pending",
        }));
      } else if (currentStatus === "pending") {
        const response = await axios.post(
          "http://localhost:5000/api/connections/status",
          {
            userId,
            status: "rejected",
          }
        );

        console.log("Status changed back to Connect:", response.data);
        setConnectionStatus((prevStatus) => ({
          ...prevStatus,
          [userId]: "connect",
        }));
      }
    } catch (error) {
      console.error("Error sending connection request:", error);
    }
  };
  return (
    <div className="mt-20">
      <Section>
        <h1>Search Results</h1>
        {searchTerm && <p>Showing results for: {searchTerm}</p>}
        {suggestedUsers &&
          suggestedUsers.map((user) => (
            <li key={user._id} className="flex  my-3 relative text-sm gap-3">
              <a>
                <img
                  src={user.profilePicture ? user.profilePicture : userIcon}
                  alt={user.username}
                  className="w-10 h-10 rounded-full"
                />
              </a>
              <div className="flex items-center w-full gap-4">
                <div className="flex-grow">
                  <span className="font-semibold text-black">
                    {user.firstName
                      ? `${user.firstName} ${user.lastName}`
                      : user.username}
                  </span>
                  <div className="text-gray-500">{user.headline}</div>
                </div>

                <button
                  className={`bg-transparent text-black/60 shadow-inner border border-black/60 py-4 px-4 rounded-full flex items-center 
              font-semibold justify-center max-h-8 max-w-[480px] text-center outline-none 
              hover:border-black hover:border-1 ${
                connectionStatus[user._id] === "accepted" ? "hidden" : "block"
              }
              ${connectionStatus[user._id] === "pending" ? "bg-gray-500" : ""}`}
                  onClick={() => sendConnectionRequest(user._id)}
                >
                  {connectionStatus[user._id]}
                </button>
              </div>
            </li>
          ))}
      </Section>
    </div>
  );
};

export default SearchPage;
