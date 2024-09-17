// const Notifications = () => {
//   return (
//     <div className="bg-linkedinLightGray min-h-screen py-3 ">
//         notifications
//       {/* <div className="w-3/4 mx-auto flex flex-col container md:flex-row items-start justify-evenly gap-5">
//         <Sidebar />
//         <section className="w-full md:2/4 lg:w-3/4 mx-auto">
//           <Invitations />
//           <MainContent />
//         </section>
//       </div> */}
//     </div>
//   );
// };

// export default Notifications;
import React, { useState } from "react";
import FilterOptions from "./components/FilterOptions";
import Section from "../../components/common/Section";

const NotificationPage = () => {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    // Fetch or filter notifications based on the new filter
  };

  return (
    <div className=" min-h-screen py-3 mx-auto p-4 bg-linkedinLightGray mt-16 ">
      <main className="w-1/2 mx-auto">
        <Section>
          <FilterOptions onFilterChange={handleFilterChange} />
        </Section>
      </main>
      {/* Other components like NotificationList go here */}
    </div>
  );
};

export default NotificationPage;
