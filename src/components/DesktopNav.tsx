"use client";

import React from "react";
import Logo from "./Logo";
import Image from "next/image";
import IconHome from "@/assets/images/icon-home.svg";
import IconSearch from "@/assets/images/icon-search.svg";
import IconArchive from "@/assets/images/icon-archive.svg";
import IconTag from "@/assets/images/icon-tag.svg";
import IconSetting from "@/assets/images/icon-settings.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const linkNav = [
  {
    name: "All Notes",
    nav: "/",
    logo: <Image src={IconHome} alt="" />,
  },
  {
    name: "Archived Notes",
    nav: "/archived",
    logo: <Image src={IconArchive} alt="" />,
  },
];

const DesktopNav = () => {
  const location = usePathname();
  return (
    <div className="flex flex-col">
      <div className="pb-8 pl-4 pt-4">
        <Logo />
      </div>
      <nav className="p-4">
        {linkNav.map((link, i) => {
          return (
            <Link
              key={i}
              href={link.nav}
              className={`flex w-full rounded-md px-1 py-2 ${location === link.nav ? "bg-notes-blue-third" : ""}`}
            >
              <div className="flex w-3/4 items-center gap-2 py-1">
                {link.logo}
                <h2 className="text-xs">{link.name}</h2>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DesktopNav;
