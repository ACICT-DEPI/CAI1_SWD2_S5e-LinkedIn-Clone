import React from "react";

function EditIcon({ 
  width = 24, 
  height = 24, 
  stroke = "currentColor", 
  strokeWidth = 2, 
  fill = "none" 
}) {
  return (
    <svg
      className="feather feather-edit-2"
      fill={fill} // dynamic fill color
      height={height}
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}
export default EditIcon;
