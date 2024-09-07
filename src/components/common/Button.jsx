import React from 'react'

const Button = ({
  label, icon,
  onClick,
  styleType = "default",
  className = ''
}) => {

  const baseStyle = "flex items-center justify-center px-4 py-2 rounded-full border hover:shadow-md transition-shadow duration-200 ease-in-out";
  
  const styleTypes = {
    default: "border-gray-400 text-black hover:border-gray-500",
    primary: "bg-linkedin-blue text-white hover:bg-linkedin-dark-blue",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  // Combine all styles
  const finalClassNames = `${baseStyles} ${styleTypes[styleType]} ${className}`;

  return (
    <button onClick={onClick} className={finalClassNames}>
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
}

export default Button
