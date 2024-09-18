import React from "react";
import Section from "./Section";

function UserInfoCart() {
  return (
    <Section>
      {/* user photos */}
      <div className="relative  mb-5 fixed">
        <img
          src="https://picsum.photos/1000/1000"
          alt=""
          className="h-[100px] w-[100%] object-cover "
        />
        <img
          src="https://picsum.photos/1000/1000"
          alt=""
          className="h-[80px] w-[80px] rounded-full absolute top-12 border-2 left-1/2 -translate-x-1/2 cursor-pointer"
        />
      </div>
      {/* user name and title*/}
      <div className="py-6 text-center">
        <p className="hover:underline hover:text-linkedinBlue  cursor-pointer">
          Mohamed Essam Elramah
        </p>
        <p className="text-linkedinGray">
          Software Engineer | Frontend Developer
        </p>
      </div>
      <div className="border-t-2 w-full flex justify-between p-3">
        <p>Followers</p>
        <p className="text-linkedinBlue hover:underline cursor-pointer">
          1,089
        </p>
      </div>
    </Section>
  );
}

export default UserInfoCart;
