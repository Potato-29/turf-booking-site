"use client";
import { VenueInformationComponent } from "@/components/VenueInformation";
import React from "react";

const VenuePage = ({ params }) => {
  return <VenueInformationComponent params={params} />;
};

export default VenuePage;
