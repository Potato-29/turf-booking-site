"use client";
import React from "react";
import { Tabs } from "antd";
import TurfCard from "../TurfCard/TurfCard";
import TurfList from "../TurfList/TurfList";

const QuickBook = () => {
  const items = [
    {
      key: "1",
      label: "Football",
      children: <TurfList />,
    },
    {
      key: "2",
      label: "Cricket",
      children: <TurfList />,
    },
    {
      key: "3",
      label: "Others",
      children: <TurfList />,
    },
  ];
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
        onChange={(value) => console.log(value)}
      />
    </div>
  );
};

export default QuickBook;
