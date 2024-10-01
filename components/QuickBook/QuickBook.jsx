"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import TurfList from "../TurfList/TurfList";
import { getTurfBySport } from "@/services/turf-services";
import "@/styles/quick-book.css";

const QuickBook = () => {
  const [turfs, setTurfs] = useState([]);
  const items = [
    {
      key: "football",
      label: "Football",
      children: <TurfList turfs={turfs} />,
    },
    {
      key: "cricket",
      label: "Cricket",
      children: <TurfList turfs={turfs} />,
    },
    {
      key: "all",
      label: "All sports",
      children: <TurfList turfs={turfs} />,
    },
  ];

  const getFilteredTurfs = async (type) => {
    const result = await getTurfBySport(type);
    setTurfs(result);
  };

  useEffect(() => {
    getFilteredTurfs("football");
  }, []);

  return (
    <div className="w-full flex justify-center items-center py-10 flex-col">
      <div className="py-8">
        <h1 className="text-2xl">Make a quick booking</h1>
      </div>
      <Tabs
        className="w-full flex justify-center items-center"
        defaultActiveKey="1"
        centered
        tabBarStyle={{ width: "100%" }}
        items={items}
        onChange={(value) => getFilteredTurfs(value)}
      />
    </div>
  );
};

export default QuickBook;
