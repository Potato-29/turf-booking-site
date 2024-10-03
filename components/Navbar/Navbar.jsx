import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined, CloseOutlined, BookOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  // Consolidated inline styles
  const drawerTitleStyle = {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  };

  const drawerContentStyle = {
    display: "flex", 
    flexDirection: "column", 
    padding: '16px',
  };

  const buttonStyle = {
    width: "100%", 
    marginBottom: '12px',
  };

  return (
    <div className="bg-gray-100 flex flex-row justify-between py-5 px-3 w-full z-[999] fixed top-0">
      <div className="flex justify-center items-center">LOGO</div>

      {/* Desktop menu */}
      <div className="hidden lg:flex flex-row pl-10">
        <Button onClick={() => router.push("/")} type="text" className="mx-3">
          Home
        </Button>
        <Button type="text" className="mx-3">
          Book
        </Button>
        <Button type="text" className="mx-3">
          About
        </Button>
      </div>

      <div className="hidden lg:flex flex-row justify-center items-center">
        <Button type="text" className="mx-2">
          <BookOutlined className="text-lg" />
        </Button>
        <Button onClick={handleProfileClick} type="text" className="mx-2">
          <UserOutlined className="text-lg" />
        </Button>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden flex justify-center items-center">
        <Button type="text" onClick={showDrawer}>
          <MenuOutlined className="text-lg" />
        </Button>
      </div>

      
      <Drawer
        title={
          <div style={drawerTitleStyle}>
            Menu
            <CloseOutlined onClick={closeDrawer} style={{ cursor: 'pointer' }} />
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        open={open}
        height="auto"
        width={250}
        closable={false}
        mask={true}
      >
       
          <Button
            onClick={() => {
              router.push("/");
              closeDrawer();
            }}
            type="text"
            style={buttonStyle}
          >
            Home
          </Button>
          <Button type="text" style={buttonStyle} onClick={closeDrawer}>
            Book
          </Button>
          <Button type="text" style={buttonStyle} onClick={closeDrawer}>
            About
          </Button>
          <Button
            type="text"
            style={buttonStyle}
            onClick={() => {
              handleProfileClick();
              closeDrawer();
            }}
          >
            Profile
          </Button>
       
      </Drawer>
    </div>
  );
};

export default Navbar;
