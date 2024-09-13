import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import homeIcon from "../assets/images/nav/home-logo.svg";
import feedIcon from "../assets/images/nav/nav-home.svg";
import jobsIcon from "../assets/images/nav/nav-jobs.svg";
import messagingIcon from "../assets/images/nav/nav-messaging.svg";
import networkIcon from "../assets/images/nav/nav-network.svg";
import notificationsIcon from "../assets/images/nav/nav-notifications.svg";
import userIcon from "../assets/images/nav/user.svg";
import searchIcon from "../assets/images/nav/search-icon.svg";
import ellipsisIcon from "../assets/images/ellipsis.svg";

//global
const icons = [
  { src: feedIcon, alt: "feed", label: "Home" },
  { src: networkIcon, alt: "networks", label: "My Networks" },
  { src: jobsIcon, alt: "jobs", label: "Jobs" },
  { src: messagingIcon, alt: "messaging", label: "Messaging" },
  { src: notificationsIcon, alt: "notifications", label: "Notifications" },
];

export default function Navbar() {
  //states
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [visibleIcons, setVisibleIcons] = useState(icons.length);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  //ref
  const navbarRef = useRef(null);
  const ellipsesDropdown = useRef(null);
  const userDropdown = useRef(null);

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

  //use effects
  useEffect(() => {
    updateVisibleIcons();
    window.addEventListener("resize", updateVisibleIcons);
    return () => window.removeEventListener("resize", updateVisibleIcons);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsSearchFocused(false);
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

  // rendering
  return (
    <div
      ref={navbarRef}
      className="flex justify-center items-center h-16 bg-white shadow max-w-full content-center  px-4 sm:px-6 lg:px-8"
    >
      {/* logo */}
      <Link to="home" className="flex-shrink-0">
        <img src={homeIcon} alt="logo" />
      </Link>

      <div className="flex space-x-4  flex-shrink-0">
        {/* Search Icon on Small Screens */}
        <div
          className={` cursor-pointer flex flex-col items-center hover:bg-gray-200 text-gray-500 hover:text-black px-3 py-2 rounded-md text-xs font-medium lg:hidden ${
            isSearchFocused ? "hidden" : "block"
          }`}
          onClick={() => setIsSearchFocused(true)}
        >
          <img
            src={searchIcon}
            alt="search icon"
            className="h-5 w-5 text-gray-500 hover:text-black icon"
          />
          <span className="hidden sm:inline">search</span>
        </div>

        {/* Search Bar on Large Screens */}
        <div className="relative hidden lg:flex flex-grow ">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-md px-3 py-1.5 pl-10 mr-4 w-32 lg:w-48 transition-width duration-300 ease-in-out focus:w-72"
          />
          <img
            src={searchIcon}
            alt="search icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        {/* Search Bar on Small Screens */}
        {isSearchFocused && (
          <div className="relative lg:hidden flex">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-md px-3 py-1.5 pl-10"
            />
            <img
              src={searchIcon}
              alt="search icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
          </div>
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
                  src={userIcon}
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
                <div className="absolute right-0 bg-white shadow-lg rounded-md mt-6 z-20">
                  <div className="flex flex-col p-2">
                    <Link
                      to="/profile"
                      className="items-center hover:bg-gray-200 px-3 py-2 rounded-md"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/home"
                      className="items-center hover:bg-gray-200 px-3 py-2 rounded-md whitespace-nowrap"
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
              <div className="absolute right-0 bg-white shadow-lg rounded-md mt-8">
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
