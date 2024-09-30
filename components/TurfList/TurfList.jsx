"use client";
import React, { useEffect, useState } from "react";
import { List, Card } from "antd";
import { supabase } from "@/utils/supabase/supabase";
import TurfCard from "../TurfCard/TurfCard";

const TurfList = () => {
  const [turfs, setTurfs] = useState([]);
  const getData = async () => {
    const { data } = await supabase.from("turfs").select("*");
    setTurfs(data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <List
      className="overflow-hidden"
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 3,
      }}
      dataSource={turfs}
      renderItem={(item) => (
        <List.Item>
          <TurfCard turf={item} />
        </List.Item>
      )}
    />
  );
};

export default TurfList;
