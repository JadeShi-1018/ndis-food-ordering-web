"use client";
import React, { useState } from "react";

const UserSignUpPage = () => {
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const getButtonStyle = (value: string) =>
    gender === value
      ? "bg-[#285770] text-white border border-[#285770]"
      : "bg-white text-[#285770] border border-gray-300";

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="text-[#285770] bg-white">
      {/* main label */}
      <div className="italic text-center mt-2 mb-2">
        <h1 className="text-4xl font-normal -mb-2">N D I S</h1>
        <div className="text-base">Service System</div>
      </div>

      <div className="text-center text-sm">
        註冊成為<strong>NDIS</strong>服務系統的成員，您將可以透過我們找到優良的
        <strong>Provider</strong>，解決您食衣住行的大小事！
      </div>

      {/* form */}
      <form
        onSubmit={handleSignUp}
        className="bg-[#E1F0F2] max-w-[90%] mx-auto rounded-2xl p-5"
      >
        <h2 className="text-2xl font-bold text-center mb-4">註 冊</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* left */}
          <div className="space-y-4">
            <Input label="姓名" placeholder="Enter your full name" type="text" />
            <Input label="密碼" placeholder="Enter your password" type="password" />
            <Input label="確認密碼" placeholder="Confirm your password" type="password" />
            <Input label="出生日期" placeholder="DD/MM/YYYY" type="date" />
            <div className="flex flex-col space-y-2">
              <label className="font-medium">性 別</label>
              <div className="flex gap-2">
                {["Male", "Female", "Other"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setGender(option as "Male" | "Female" | "Other")
                    }
                    className={`px-4 py-1 rounded-md ${getButtonStyle(option)}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
              <Input label="聯絡電話" placeholder="Enter your phone number" type="tel" />

          </div>

          {/* right */}
          <div className="space-y-9">
            <Input label="Email" placeholder="Enter your email" />
            <div className="flex flex-col space-y-4">
              <label className="font-medium">
                CRN（由NDIS提供給您的Customer Reference Number）
              </label>
              <button
                type="button"
                className="bg-[#285770] text-white py-1 px-6 rounded-2xl w-fit"
              >
                連結我的CRN
              </button>
            </div>
            <Input label="居住地址" placeholder="Enter your residential address" type="text" />

            <Input label="緊急聯絡人/關係" placeholder="e.g. Mother / Friend" type="text" />

            <Input label="聯絡人電話" placeholder="Enter emergency contact number" type="tel" />
          </div>
        </div>

        {/* button */}
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="bg-[#285770] text-white px-10 py-2 rounded-full text-lg"
          >
            完 成
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) => (
  <div className="flex flex-col space-y-1">
    <label className="font-medium">{label}</label>
    <input
      className="border rounded-2xl py-2 px-3"
      type={type}
      placeholder={placeholder}
    />
  </div>
);


export default UserSignUpPage;
