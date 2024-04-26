"use client";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import { loginUser } from "@/helpers/authApi";
import { useRouter } from "next/navigation";
import { userRoles } from "@/constants";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const { response } = await loginUser(values);
      if (response) {
        let user_role = response.user.user_metadata["user-role"];
        if (user_role === userRoles.PLAYER) {
          router.push("/");
        }

        if (user_role === userRoles.MANAGER) {
          router.push("/manager/dashboard");
        }

        if (user_role === userRoles.ADMIN) {
          router.push("/admin/dashboard");
        }

        setIsLoading(false);
        message.success("Login successfull");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
      setIsLoading(false);
    }
  };
  return (
    <Form
      name="normal_login"
      className="flex justify-center items-center h-full flex-col"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        className="w-96"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        className="w-96 m-0 p-0"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <div className="flex flex-row justify-between w-96 mb-4 mt-2">
        {/* <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <div>
          <a className="text-blue-400" href="">
            Forgot password? Reset it here.
          </a>
        </div>
      </div>

      <Form.Item className="w-96 flex flex-col">
        <Button type="default" htmlType="submit" className="w-full">
          {isLoading ? <Spin /> : "Log in"}
        </Button>
        <div>
          Or{" "}
          <a className="text-blue-400" href="/signup">
            register now!
          </a>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Login;
