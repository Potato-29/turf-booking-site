import React from "react";
import { Button } from "antd";
import { BookOutlined, UserOutlined } from "@ant-design/icons";
const Navbar = () => {
  return (
    <div className="bg-gray-100 flex flex-row justify-evenly py-5 px-3 fixed w-full z-[999]">
      <div className="flex justify-center items-center">LOGO</div>
      <div className="flex flex-row pl-24">
        <Button type="text" className="mx-3">
          Home
        </Button>
        <Button type="text" className="mx-3">
          Book
        </Button>
        <Button type="text" className="mx-3">
          About
        </Button>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="mx-2">
          <Button type="text" className="flex justify-center items-center pb-2">
            <BookOutlined className="text-lg" />
          </Button>
        </div>
        <div className="mx-2">
          <Button type="text" className="flex justify-center items-center pb-2">
            <UserOutlined className="text-lg" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
