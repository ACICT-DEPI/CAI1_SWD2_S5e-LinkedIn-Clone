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

const NotificationPage = () => {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    // Fetch or filter notifications based on the new filter
  };

  return (
    <div className="container mx-auto p-4 bg-linkedinLightGray">
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
      <FilterOptions onFilterChange={handleFilterChange} />
      {/* Other components like NotificationList go here */}
    </div>
  );
};

export default NotificationPage;