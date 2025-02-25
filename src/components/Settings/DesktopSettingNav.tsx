"use client";

import React from "react";
import Image from "next/image";
import IconColor from "@/assets/images/icon-sun.svg";
import IconFont from "@/assets/images/icon-font.svg";
import IconPassword from "@/assets/images/icon-lock.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

const settingNav = [
  {
    name: "Color Theme",
    nav: "color-theme",
    logo: <Image src={IconColor} alt="" />,
  },
  {
    name: "Font Theme",
    nav: "font-theme",
    logo: <Image src={IconFont} alt="" />,
  },
  {
    name: "Change Password",
    nav: "change-password",
    logo: <Image src={IconPassword} alt="" />,
  },
];
const DesktopSettingNav = () => {
  const location = usePathname();
  return (
    <ul className="mb-4 flex h-fit flex-col gap-2">
      {settingNav.map((link, i) => {
        return (
          <li key={i}>
            <Link
              href={`/settings/${link.nav}`}
              className={`flex w-full items-center justify-between rounded-md px-1 py-2 hover:bg-notes-blue-third ${location.split("/")[2] === link.nav ? "bg-notes-blue-third" : ""}`}
            >
              <div className="flex w-3/4 items-center gap-2 py-1">
                {link.logo}
                <h2 className="text-base">{link.name}</h2>
              </div>
              {location.split("/")[2] === link.nav && (
                <div>
                  <IoIosArrowForward />
                </div>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DesktopSettingNav;
