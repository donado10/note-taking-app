"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import IconHome from "@/assets/images/icon-home.svg";
import IconSearch from "@/assets/images/icon-search.svg";
import IconArchive from "@/assets/images/icon-archive.svg";
import IconTag from "@/assets/images/icon-tag.svg";
import IconSetting from "@/assets/images/icon-settings.svg";
import { usePathname } from "next/navigation";
import useMediaQuery, { EMediaQuery } from "@/hooks/useMediaQuery";

const linkNav = [
  {
    name: "Home",
    nav: "/home",
    logo: <Image src={IconHome} alt="" />,
  },
  {
    name: "Search",
    nav: "/search",
    logo: <Image src={IconSearch} alt="" />,
  },
  {
    name: "Archived",
    nav: "/archived",
    logo: <Image src={IconArchive} alt="" />,
  },
  {
    name: "Tags",
    nav: "/tags",
    logo: <Image src={IconTag} alt="" />,
  },
  {
    name: "Settings",
    nav: "/settings",
    logo: <Image src={IconSetting} alt="" />,
  },
];

const MobileNav = () => {
  const location = usePathname();
  const Small = useMediaQuery(EMediaQuery.SMALL);

  return (
    <div className="flex w-4/5 items-center justify-between gap-4 px-2 py-4">
      {linkNav.map((link, i) => {
        return (
          <Link
            key={i}
            href={link.nav}
            className={`flex w-full items-center justify-center ${location === link.nav ? "bg-notes-blue-third px-2" : ""}`}
          >
            <div className="flex w-3/4 items-center justify-center py-1 md:flex-col md:gap-1">
              {link.logo}
              {Small && <h2 className="text-xs">{link.name}</h2>}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileNav;
