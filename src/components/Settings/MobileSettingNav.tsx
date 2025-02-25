"use client";

import React from "react";
import Image from "next/image";
import IconColor from "@/assets/images/icon-sun.svg";
import IconFont from "@/assets/images/icon-font.svg";
import IconPassword from "@/assets/images/icon-lock.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

const MobileSettingNav = () => {
  const location = usePathname();
  return (
    <ul className="mt-4 flex flex-col">
      {settingNav.map((setting, i) => {
        return (
          <li key={i} className="items-center">
            <Link
              href={`/settings/${setting.nav.toLowerCase()}`}
              className={`flex w-full items-center justify-between rounded-md px-1 py-4 hover:bg-notes-blue-third ${location.split("/")[2] === setting.nav.toLowerCase() ? "bg-notes-blue-third" : ""}`}
            >
              <div className="flex items-center gap-4">
                {setting.logo}
                <span>{setting.name}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MobileSettingNav;
