import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import homeIcon from "../assets/images/nav/home-logo.svg";
import feedIcon from "../assets/images/nav/nav-home.svg";
import messagingIcon from "../assets/images/nav/nav-messaging.svg";
import networkIcon from "../assets/images/nav/nav-network.svg";
import notificationsIcon from "../assets/images/nav/nav-notifications.svg";
import userIcon from "../assets/images/nav/user.svg";
import searchIcon from "../assets/images/nav/search-icon.svg";
import ellipsisIcon from "../assets/images/ellipsis.svg";
import { useAuthStore } from "../store/authStore";
import SearchBar from "./SearchBar";
import axios from "axios";

//global
const icons = [
  { src: feedIcon, alt: "feed", label: "Home" },
  { src: networkIcon, alt: "networks", label: "My Networks" },
  { src: messagingIcon, alt: "messaging", label: "Messaging" },
  { src: notificationsIcon, alt: "notifications", label: "Notifications" },
];

export default function Navbar() {
  //states
  const { logout,user } = useAuthStore();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [visibleIcons, setVisibleIcons] = useState(icons.length);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024); // lg breakpoint

  //ref
  const navbarRef = useRef(null);
  const ellipsesDropdown = useRef(null);
  const userDropdown = useRef(null);
  const dropdownItemsRef = useRef([]); // Ref for dropdown items

  //use effects

  //updateVisibleIcons
  useEffect(() => {
    updateVisibleIcons();
    window.addEventListener("resize", updateVisibleIcons);
    return () => window.removeEventListener("resize", updateVisibleIcons);
  }, []);

  //handle click outside a dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      const isClickInsideDropdownItems = dropdownItemsRef.current.some(
        (item) => item && item.contains(event.target)
      );

      if (isClickInsideDropdownItems) {
        // If the click is inside dropdown items, do not close the menu
        return;
      }
      if (
        userDropdown.current &&
        !userDropdown.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        ellipsesDropdown.current &&
        !ellipsesDropdown.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarRef, userDropdown, ellipsesDropdown]);

  // Fetch initial suggested users
  useEffect(() => {
    // Fetch suggested users when the component mounts
    const fetchSuggestedUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/suggestions",
          {
            params: { page: 1, limit: 5 },
          }
        );
        setSuggestedUsers(response.data.suggestedUsers);
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      }
    };

    fetchSuggestedUsers();
  }, []);

  // Fetch search results from backend when search term changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      const page = 1; // You can set this dynamically if you're paginating
      const limit = 10; // You can adjust this to fit your needs

      if (searchTerm === "") {
        setFilteredUsers(suggestedUsers); // Show suggested users when no search term
      } else {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/users`, // Your backend route for fetching users
            {
              params: {
                search: searchTerm,
                page,
                limit,
              },
            }
          );

          const { users } = response.data;
          setFilteredUsers(users);
        } catch (error) {
          console.error("Error fetching search results", error);
        }
      }
    };

    fetchSearchResults();
  }, [searchTerm, suggestedUsers]);

  // Add event listener for screen resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Run handleResize on component mount to set initial state
    handleResize();

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //handle
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const updateVisibleIcons = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setVisibleIcons(icons.length);
    } else if (width >= 768) {
      setVisibleIcons(icons.length - 1);
    } else if (width >= 500) {
      setVisibleIcons(icons.length - 2);
    } else if (width >= 200) {
      setVisibleIcons(icons.length - 3);
    } else {
      setVisibleIcons(icons.length - 4);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/home");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleOnSearchIconClick = () => {
    setIsSearchFocused(true);
    setIsSearchBarVisible(true);
  };

  // Function to handle screen resize
  const handleResize = () => {
    const isLarge = window.innerWidth >= 1024;
    setIsLargeScreen(isLarge);
    if (isLarge) {
      setIsSearchBarVisible(true); // Set search bar visibility to false on large screens
    } else {
      setIsSearchBarVisible(false); // Set search bar visibility to false on large screens
    }
  };

  // rendering
  return (
    <div
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 flex justify-center items-center h-16 bg-white shadow max-w-full content-center  px-4 sm:px-6 lg:px-8 z-50"
    >
      {/* logo */}
      <Link to="/feed" className="flex-shrink-0">
        <img src={homeIcon} alt="logo" />
      </Link>

      <div className="flex space-x-4  flex-shrink-0">
        {/* Search Icon on Small Screens */}
        <div
          className={` cursor-pointer flex flex-col items-center hover:bg-gray-200 text-gray-500 hover:text-black ml-2 px-3 py-2 rounded-md text-xs font-medium lg:hidden ${
            isSearchBarVisible ? "hidden" : "block"
          }`}
          onClick={handleOnSearchIconClick}
        >
          <img
            src={searchIcon}
            alt="search icon"
            className="h-5 w-5 text-gray-500 hover:text-black icon"
          />
          <span className="hidden sm:inline">search</span>
        </div>

        {/* Search Bar */}
        {isSearchBarVisible && (
          <SearchBar onSearch={setSearchTerm} filteredUsers={filteredUsers} />
        )}
        {/* Main Icons (Hidden when search is active on small screens) */}
        {!isSearchFocused && (
          <>
            {icons.slice(0, visibleIcons).map((icon, index) => (
              <Link
                to={`/${icon.alt}`}
                key={index}
                className="flex flex-col items-center hover:bg-gray-200 text-gray-500 hover:text-black px-3 py-2 rounded-md text-xs font-medium"
              >
                <img src={icon.src} alt={icon.alt} className="h-5 w-5 icon" />
                <span className="hidden sm:inline">{icon.label}</span>
              </Link>
            ))}
            {/* User Icon with Dropdown */}
            <div className="relative">
              <div
                onClick={toggleUserMenu}
                className="flex flex-col items-center text-gray-500 hover:text-black px-3 py-2 rounded-md text-xs font-medium cursor-pointer"
                ref={userDropdown}
              >
                <img
                  src={user.profilePicture?user.profilePicture:userIcon}
                  alt="user icon"
                  className="rounded-full h-5 w-5"
                />
                <div className="flex items-center">
                  <span className="hidden sm:inline">Me</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="ml-1 hidden sm:inline fill-current"
                  >
                    <path d="M8.8 10.66L14 5.12a.07.07 0 00-.07-.12H2.07a.07.07 0 00-.07.12l5.2 5.54a1.1 1.1 0 001.6 0z"></path>
                  </svg>
                </div>
              </div>

              {/* Dropdown User Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 bg-white shadow-lg rounded-md mt-3 z-50">
                  <div className="flex flex-col p-2">
                    <Link
                      to="/profile"
                      className="items-center hover:bg-gray-200 px-3 py-2 rounded-md"
                      onClick={toggleUserMenu}
                      ref={(el) => (dropdownItemsRef.current[0] = el)} // Save reference to first item
                    >
                      Profile
                    </Link>
                    <Link
                      to="/home"
                      ref={(el) => (dropdownItemsRef.current[2] = el)} // Save reference to first item
                      className="items-center hover:bg-gray-200 px-3 py-2 rounded-md whitespace-nowrap"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Ellipsis Icon */}
        {!isSearchFocused && (
          <div
            className="relative items-center hover:bg-gray-200 px-3 py-2 rounded-md font-medium lg:hidden"
            onClick={toggleDropdown}
            ref={ellipsesDropdown}
          >
            <img
              src={ellipsisIcon}
              alt="ellipsis icon"
              className="h-5 w-5 icon "
            />
            {/*Ellipsis Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 bg-white shadow-lg rounded-md mt-8 z-50">
                <div className="flex flex-col p-2">
                  {icons.slice(visibleIcons).map((icon, index) => (
                    <Link
                      to={`/${icon.alt}`}
                      key={index}
                      className="flex items-center hover:bg-gray-200 px-3 py-2 rounded-md"
                    >
                      <img
                        src={icon.src}
                        alt={icon.alt}
                        className="h-5 w-5 mr-2 icon"
                      />
                      <span>{icon.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
