import styled from "styled-components";
import axios from "axios";
import userIcon from "../assets/images/nav/user.svg";
import { useEffect, useState } from "react";
const Rightside = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState({});

  useEffect(() => {
    // Fetch suggested users when the component mounts
    const fetchSuggestedUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/suggestions",
          {
            params: { page: 1, limit: 3 },
          }
        );
        setSuggestedUsers(response.data.suggestedUsers);
        // Initialize the connectionStatus for each user as "Connect"
        const initialStatus = response.data.suggestedUsers.reduce(
          (acc, user) => {
            acc[user._id] = "Connect"; // default state is "Connect"
            return acc;
          },
          {}
        );
        setConnectionStatus(initialStatus);
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      }
    };

    fetchSuggestedUsers();
  }, []);

  const sendConnectionRequest = async (userId) => {
    try {
      const currentStatus = connectionStatus[userId];

      if (currentStatus === "Connect") {
        console.log(userId);

        // Send a connection request
        const response = await axios.post(
          "http://localhost:5000/api/connections",
          {
            receiverId: userId,
          }
        );

        console.log(" request :", response);
        console.log("Connection request sent:", response.data);
        // Update the connection status to "Pending"
        setConnectionStatus((prevStatus) => ({
          ...prevStatus,
          [userId]: "Pending",
        }));
      } else if (currentStatus === "Pending") {
        console.log("in elseeeeeeeeeeeeee");

        // Call changeStatus API to revert the status back to "Connect"
        const response = await axios.post(
          "http://localhost:5000/api/connections/status",
          {
            userId,
            status: "rejected",
          }
        );

        console.log("Status changed back to Connect:", response.data);
        // Update the connection status to "Connect"
        setConnectionStatus((prevStatus) => ({
          ...prevStatus,
          [userId]: "Connect",
        }));
      }
    } catch (error) {
      console.error("Error sending connection request:", error);
    }
  };
  return (
    <Container>
      <FollowCard>
        <Title>
          <h2>Add to your feed</h2>
          <img src="src/assets/images/feed-icon.svg" alt="" />
        </Title>
        <div>
          {suggestedUsers.map((user) => (
            <li key={user._id} className="flex  my-3 relative text-sm gap-3">
              <a>
                <img
                  src={user.profilePicture ? user.profilePicture : userIcon}
                  alt={user.username}
                  className="w-10 h-10 rounded-full"
                />
              </a>
              <div className="flex flex-col gap-0">
                <span className="font-semibold text-black">
                  {user.username}
                </span>
                <div className="text-gray-500">{user.headline}</div>
                <button
                  className={`bg-transparent text-black/60 shadow-inner border border-black/60 py-4 px-4 rounded-full flex items-center 
              font-semibold justify-center max-h-8 max-w-[480px] text-center outline-none 
              hover:border-black hover:border-1
              ${connectionStatus[user._id] === "Pending" ? "bg-gray-400" : ""}`}
                  onClick={() => sendConnectionRequest(user._id)}
                >
                  {connectionStatus[user._id] || "Connect"}
                </button>
              </div>
            </li>
          ))}
        </div>

        <Recommendation>
          View all recommendations
          <img src="src/assets/images/right-icon.svg" alt="" />
        </Recommendation>
      </FollowCard>
      <BannerCard>
        <img src="src/assets/images/banner-image.jpg" alt="" />
      </BannerCard>
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightside;
`;

const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding: 12px;
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
`;

const FeedList = styled.ul`
  margin-top: 16px;
  li {
    display: flex;
    align-items: center;
    margin: 12px 0;
    position: relative;
    font-size: 14px;
    & > div {
      display: flex;
      flex-direction: column;
    }

    button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
      padding: 16px;
      align-items: center;
      border-radius: 15px;
      box-sizing: border-box;
      font-weight: 600;
      display: inline-flex;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
    }
  }
`;

const Avatar = styled.div`
  background-image: url("src/assets/images/avatar.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 48px;
  height: 48px;
  margin-right: 8px;
`;

const Recommendation = styled.a`
  color: #0a66c2;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const BannerCard = styled(FollowCard)`
  img {
    width: 100%;
    height: 100%;
  }
`;

export default Rightside;
