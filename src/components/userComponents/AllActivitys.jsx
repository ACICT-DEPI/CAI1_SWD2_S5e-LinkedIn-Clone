import React from "react";
import Section from "../common/section";
import Button from "../common/Button";
import PostFullView from "../common/PostFullView";
import UserInfoCart from "../common/UserInfoCart";
import RecommendCard from "../common/RecommendCard";
function AllActivitys() {
  return (
    <div className="max-w-[75%] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Left Sidebar */}
      <aside className="hidden md:block md:col-span-3  p-4">
        <UserInfoCart></UserInfoCart>
      </aside>
      {/* Main Content Area */}
      <main className="col-span-1 md:col-span-6 p-4">
        <Section>
          <div>
            <div className="flex gap-2 justify-between py-3">
              <div>
                <p className="font-semibold text-xl">All activity</p>
              </div>
            </div>
          </div>

          <PostFullView />
        </Section>
        {/* Add more posts as needed */}
      </main>
      {/* Right Sidebar */}
      <aside className="hidden md:block md:col-span-3 p-4">
        <RecommendCard/>
      </aside>
    </div>
  );
}

export default AllActivitys;
