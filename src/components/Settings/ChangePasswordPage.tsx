"use client";

import React from "react";
import BackButton from "../BackButton";
import Image from "next/image";
import IconShowPass from "@/assets/images/icon-show-password.svg";
import useMediaQuery, { EMediaQuery } from "@/hooks/useMediaQuery";

const ChangePasswordPage = () => {
  const Mobile = useMediaQuery(EMediaQuery.MOBILE);
  const Big = useMediaQuery(EMediaQuery.BIG);
  return (
    <div className="h-full w-full">
      {Mobile && !Big && (
        <div className="mb-2">
          <BackButton />
        </div>
      )}
      <h1 className="mb-4 text-2xl font-bold">Change Password</h1>
      <form className="mb-4 flex flex-col gap-2">
        <div>
          <label htmlFor="old-pass">Old Password</label>
          <div className="flex items-center justify-between rounded-lg border-2 p-2">
            <input type="text" id="old-pass" className="w-4/5 outline-none" />
            <span>
              <Image src={IconShowPass} alt="" />
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="new-pass">New Password</label>
          <div className="flex items-center justify-between rounded-lg border-2 p-2">
            <input type="text" id="new-pass" className="w-4/5 outline-none" />
            <span>
              <Image src={IconShowPass} alt="" />
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="confirm-pass">Confirm Password</label>
          <div className="flex items-center justify-between rounded-lg border-2 p-2">
            <input
              type="text"
              id="confirm-pass"
              className="w-4/5 outline-none"
            />
            <span>
              <Image src={IconShowPass} alt="" />
            </span>
          </div>
        </div>
      </form>
      <div className="flex w-full">
        <button className="ml-auto rounded-lg bg-notes-blue-secondary p-2 text-xs text-white">
          <span>Save Password</span>
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
