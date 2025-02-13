import Image from "next/image";
import Link from "next/link";
import React from "react";
import IconHome from "@/assets/images/icon-home.svg";
import IconSearch from "@/assets/images/icon-search.svg";
import IconArchive from "@/assets/images/icon-archive.svg";
import IconTag from "@/assets/images/icon-tag.svg";
import IconSetting from "@/assets/images/icon-settings.svg";

const linkNav = [
  {
    name: "Home",
    nav: "/",
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
    name: "Setting",
    nav: "/settings",
    logo: <Image src={IconSetting} alt="" />,
  },
];

const MobileNav = () => {
  return (
    <div className="flex w-4/5 items-center justify-between gap-4 py-4">
      {linkNav.map((link, i) => {
        return (
          <Link key={i} href={link.nav} className="">
            <div>{link.logo}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileNav;
