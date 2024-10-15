import React, { useEffect, useState } from "react";
import Section from "../../components/common/Section";
import Button from "../../components/common/Button";
import PostFullView from "../../components/Post/PostFullView";
import UserInfoCart from "../../components/common/UserInfoCart";
import RecommendCard from "../../components/common/RecommendCard";
import { getUserPosts } from "../../utils/postApi";
function AllActivitysPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getUserPosts(setPosts, 1, 10);
  }, []);
  return posts.length > 0 ? (
    <div className="bg-linkedinLightGray min-h-screen py-3 mt-16">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Sidebar */}
        <aside className="hidden lg:block lg:col-span-3  p-4">
          <UserInfoCart user={posts[0].auther}></UserInfoCart>
        </aside>
        {/* Main Content Area */}
        <main className="col-span-1 md:col-span-6 p-4">
          <Section className="w-full">
            <div className="flex gap-2 justify-between py-3">
              <div>
                <p className="font-semibold text-xl">All activity</p>
              </div>
            </div>

            {posts ? (
              posts.map((post, index) => (
                <PostFullView post={post} key={index} />
              ))
            ) : (
              <>...loading</>
            )}
          </Section>
          {/* Add more posts as needed */}
        </main>
        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 p-4">
          <RecommendCard />
        </aside>
      </div>
    </div>
  ) : (
    <>...loading</>
  );
}

export default AllActivitysPage;
