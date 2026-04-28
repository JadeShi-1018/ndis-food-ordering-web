"use client";

import React, { useState } from "react";
import { register } from "@/apis/auth";
import { useRouter } from "next/navigation";



const UserSignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const router = useRouter();

  const [form, setForm] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const  handleSignUp = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

    console.log("Register request:", form);

   try {
    const data = (await register(form));
    console.log(data);

    // auto login
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("email", data.email);

    //redirect
    router.push("/delivery-service");

  } catch (error: any) {
    alert(error.message || "Register failed");
  }
  };

  return (
    <div className="text-[#285770] bg-white">
      {/* main label */}
      <div className="italic text-center mt-2 mb-2">
        <h1 className="text-4xl font-normal -mb-2">N D I S</h1>
        <div className="text-base">Service System</div>
      </div>

      <div className="text-center text-sm mb-4">
        Sign up to become a member of the <strong>NDIS</strong> Service System
        and find trusted <strong>Providers</strong> for your daily support needs.
      </div>

      {/* form */}
      <form
        onSubmit={handleSignUp}
        className="bg-[#E1F0F2] max-w-[90%] mx-auto rounded-2xl p-5"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* left */}
          <div className="space-y-4">
            <Input
              label="User Name"
              name="userName"
              placeholder="Enter your user name"
              type="text"
              value={form.userName}
              onChange={handleChange}
            />

            <Input
              label="Email"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <Input
              label="Phone Number"
              name="phoneNumber"
              placeholder="Enter your phone number"
              type="tel"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </div>

          {/* right */}
          <div className="space-y-4">
            <label className="font-medium">Password</label>
            <div className="relative">
  <input
    className="border rounded-2xl py-2 px-3 w-full"
    name="password"
    type={showPassword ? "text" : "password"}
    value={form.password}
    onChange={handleChange}
    placeholder="Enter your password"
    required
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-2 text-sm text-gray-500"
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>


  <label className="font-medium">Confirm Password</label>
<div className="relative">
  <input
    className="border rounded-2xl py-2 px-3 w-full"
    name="confirmPassword"
    type={showConfirmPassword ? "text" : "password"}
    value={form.confirmPassword}
    onChange={handleChange}
    placeholder="Enter your confirmed password"
    required
  />
  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-3 top-2 text-sm text-gray-500"
  >
    {showConfirmPassword ? "Hide" : "Show"}
  </button>
</div>

            
          </div>
        </div>

        {/* button */}
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="bg-[#285770] text-white px-10 py-2 rounded-full text-lg"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <div className="flex flex-col space-y-1">
    <label className="font-medium">{label}</label>
    <input
      className="border rounded-2xl py-2 px-3"
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  </div>
);

export default UserSignUpPage;