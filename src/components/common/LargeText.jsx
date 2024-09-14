import React, { useState } from "react";

function LargeText({ description, style = "" }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      {showMore ? (
        <p className={style}>
          {description}
          <span
            className="text-linkedinGray hover:text-linkedinBlue cursor-pointer"
            onClick={() => setShowMore(false)}
          >
            less
          </span>
        </p>
      ) : (
        <p className={style}>
          {description.substring(0, description.length / 4)}
          <span
            className="text-linkedinGray hover:text-linkedinBlue cursor-pointer"
            onClick={() => setShowMore(true)}
          >
            ...more
          </span>
        </p>
      )}
    </>
  );
}

export default LargeText;
