import React from 'react'

const Button = ({
  label, icon,
  onClick,
  styleType = "default",
  className = ''
}) => {

  const baseStyle = "flex items-center justify-center px-4 py-3 rounded-full border hover:shadow-md transition duration-200 ease-in-out";
  
  const styleTypes = {
    default: "border-linkedinGray text-black hover:bg-linkedin-lighthover-gray",
    primary: "bg-linkedinBlue text-white hover:bg-linkedinDarkBlue",
    // secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    outline: "border-linkedinBlue text-linkedinBlue hover:bg-linkedin-lighthover-blue",
  };

  // Combine all styles
  const finalClassNames = `${baseStyle} ${styleTypes[styleType]} ${className}`;

  return (
    <button onClick={onClick} className={finalClassNames}>
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
}

export default Button;
