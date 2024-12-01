import React from "react";
import logo from "../assets/Img/logo.png";

const LoadingSpinner = () => {
  return (
    <div className="fixed w-full left-0 top-0 flex items-center justify-center h-screen bg-gray-100">
      <img
        src={logo}
        alt="Loading..."
        className="w-32 h-auto animate-bounce"
        style={{
          animationDuration: "1.5s",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
