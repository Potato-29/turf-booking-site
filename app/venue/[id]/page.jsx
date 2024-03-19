"use client";
import React from "react";

const VenuePage = ({ params }) => {
  console.log(params.id);
  return <div className="h-screen">VenuePage {params.id}</div>;
};

export default VenuePage;
