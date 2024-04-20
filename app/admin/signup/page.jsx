"use client";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, message, Spin } from "antd";
import { signUp } from "@/helpers/authApi";
import { userRoles } from "@/constants";
import { useRouter } from "next/navigation";

const AdminSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onFinish = async (values) => {
    setIsLoading(true);
    values.role = userRoles.ADMIN;
    try {
      const response = await signUp(values);
      if (response) {
        setIsLoading(false);
        message.success("account created successfully");
        router.push("/login");
      }
    } catch (error) {
      message.error("failed to sign up!");
    }
  };

  const validatePassword = (_, value) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
    if (!value || !passwordRegex.test(value)) {
      return Promise.reject(
        "Password must contain at least one uppercase letter, one number, one special character, and be at least 6 characters long"
      );
    }
    return Promise.resolve();
  };
  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || !emailRegex.test(value)) {
      return Promise.reject("Please enter a valid email address");
    }
    return Promise.resolve();
  };
  return (
    <div className="flex justify-center items-center h-full flex-col ">
      <h3 className="text-2xl font-bold mb-10">Sign up as an admin!</h3>
      <Form
        name="normal_login"
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
              message: "",
            },
            { validator: validateEmail },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          className="w-96 "
          rules={[
            {
              required: true,
              message: "",
            },
            { validator: validatePassword },
          ]}
          name="password"
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          className="w-96 m-0 p-0"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please confirm your Password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>
        <div className="flex flex-row justify-between w-96 mb-4 mt-2">
          {/* <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

          <div>
            <a className="text-blue-400" href=""></a>
          </div>
        </div>

        <Form.Item className="w-96 flex flex-col">
          <Button type="default" htmlType="submit" className="w-full">
            {isLoading ? <Spin /> : "Create Account"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminSignup;
