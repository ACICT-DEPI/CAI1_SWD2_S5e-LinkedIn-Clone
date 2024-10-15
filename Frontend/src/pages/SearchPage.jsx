import React, { useEffect, useState } from "react";
import Section from "../components/common/Section";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
     const location = useLocation();
     const searchTerm = location.state?.searchTerm; 
  return (
    <Section>
      <h1>Search Results</h1>
      {searchTerm && <p>Showing results for: {searchTerm}</p>}
      {/* Add your search results rendering logic here */}
    </Section>
  );
};

export default SearchPage;
