"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Image from "next/image";
import IconHome from "@/assets/images/icon-home.svg";
import IconSearch from "@/assets/images/icon-search.svg";
import IconArchive from "@/assets/images/icon-archive.svg";
import IconTag from "@/assets/images/icon-tag.svg";
import { IoIosArrowForward } from "react-icons/io";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getTags } from "./actions";

const linkNav = [
  {
    name: "All Notes",
    nav: "/home",
    logo: <Image src={IconHome} alt="" />,
  },
  {
    name: "Archived Notes",
    nav: "/archived",
    logo: <Image src={IconArchive} alt="" />,
  },
];

const tagNav = [
  {
    name: "Cooking",
    nav: "cooking",
  },
  {
    name: "Fitness",
    nav: "fitness",
  },
];

const DesktopNav = () => {
  const location = usePathname();
  const [tagNav, setTagNav] = useState<string[]>([]);

  useEffect(() => {
    const tagHandler = async () => {
      const tags = await getTags();
      setTagNav(Array.from(new Set(tags)));
    };
    tagHandler();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="h-[10%] pb-8 pl-4 pt-4">
        <Logo />
      </div>
      <nav className="h-[90%]">
        <ul className="mb-4 flex h-1/5 flex-col gap-2 border-b-[1px] p-2">
          {linkNav.map((link, i) => {
            return (
              <li key={i}>
                <Link
                  href={link.nav}
                  className={`flex w-full items-center justify-between rounded-md px-1 py-2 hover:bg-notes-blue-third ${location === link.nav ? "bg-notes-blue-third" : ""}`}
                >
                  <div className="flex w-3/4 items-center gap-2 py-1">
                    {link.logo}
                    <h2 className="text-base">{link.name}</h2>
                  </div>
                  {location === link.nav && (
                    <div>
                      <IoIosArrowForward />
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="h-4/5">
          <h1 className="mb-4 text-base text-gray-400">Tags</h1>
          <ul className="flex h-[90%] flex-col gap-2 overflow-y-scroll">
            {tagNav.map((tag, i) => {
              return (
                <li key={i}>
                  <Link
                    href={`/tags/${tag.toLowerCase()}`}
                    className={`flex w-full items-center justify-between rounded-md px-1 py-2 hover:bg-notes-blue-third ${location.split("/")[2] === tag.toLowerCase() ? "bg-notes-blue-third" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <Image src={IconTag} alt="" />
                      <span>{tag}</span>
                    </div>
                    {location.split("/")[2] === tag.toLowerCase() && (
                      <div>
                        <IoIosArrowForward />
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default DesktopNav;
