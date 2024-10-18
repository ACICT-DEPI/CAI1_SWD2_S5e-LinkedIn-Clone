import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { BsPeopleFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import Section from "../../../components/common/Section";

function AnalyticsSection({isOwnProfile}) {
  const navigate = useNavigate();

  const handleShowAnalytics = () => {
    navigate('/dashboard');
  };
  return (
    isOwnProfile && (
      <Section className="bg-white rounded-lg mt-3  w-4/5 md:w-1/2 mx-auto pt-5">
        <h2 className="text-lg font-semibold px-5 text-linkedinDarkGray">
          Analytics
        </h2>
        <div className="flex items-center gap-2 px-5">
          <FaEye className="text-linkedinsecondGray" />
          <p className="text-linkedinGray text-sm">Private to you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 m-5 px-5 mb-5">
          <div className="flex gap-2">
            <BsPeopleFill className="text-3xl text-linkedinDarkGray" />
            <div>
              <h3 class="text-base font-semibold md:block text-linkedinDarkGray">
                0 profile views
              </h3>
              <p class="text-linkedinDarkGray">
                Update your profile to attract viewers.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <SiGoogleanalytics className="text-6xl text-linkedinDarkGray" />
            <div>
              <h3 class="text-base font-semibold md:block text-linkedinDarkGray">
                0 post impressions
              </h3>
              <p class="text-base text-linkedinDarkGray">
                Start a post to increase engagement.Start a post to increase
                engagement.
              </p>
              <p className="text-sm text-linkedinsecondGray">Past 7 days</p>
            </div>
          </div>
          <div className="flex gap-2">
            <IoSearch className="text-3xl text-linkedinDarkGray" />
            <div>
              <h3 class="text-base font-semibold md:block text-linkedinDarkGray">
                0 profile views
              </h3>
              <p class="text-linkedinDarkGray">
                Update your profile to attract viewers.
              </p>
            </div>
          </div>
        </div>
        <hr />
        <button
          onClick={handleShowAnalytics}
          className="w-full font-semibold  p-2 rounded-lg hover:bg-linkedin-lighthover-gray text-linkedinsecondGray hover:text-linkedinDarkGray"
        >
          <div className="flex items-center justify-center gap-2 px-5">
            <p className="">Show all analytics</p>
            <FaArrowRight />
          </div>
        </button>
      </Section>
    )
  );
}

export default AnalyticsSection
