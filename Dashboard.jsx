import React from "react";
import Nav from "./Nav";

export const Dashboard = () => {
  return (
    <div className="light-blue h-screen w-screen flex">
      <Nav />
      <div className="bg-white w-2/4 flex-grow mt-4 mb-4 mr-4 rounded-2xl"></div>
    </div>
  );
};
