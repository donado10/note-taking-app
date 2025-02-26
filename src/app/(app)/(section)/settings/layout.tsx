import DesktopSettingNav from "@/components/Settings/DesktopSettingNav";
import Link from "next/link";
import React, { ReactNode } from "react";
import { IoIosArrowForward } from "react-icons/io";
import IconLogout from "@/assets/images/icon-logout.svg";
import Image from "next/image";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="h-full w-full xs:hidden xl:flex">
        <div className="h-full w-1/4 overflow-y-scroll border-r-[1px] p-6">
          <nav className="border-b-[1px]">
            <DesktopSettingNav />
          </nav>
          <Link
            href={`/logout`}
            className={`flex w-full items-center justify-between rounded-md px-1 py-2 hover:bg-notes-blue-third`}
          >
            <div className="flex w-3/4 items-center gap-2 py-1">
              <Image src={IconLogout} alt="" />
              <h2 className="text-base">Logout</h2>
            </div>
          </Link>
        </div>
        <div className="h-full w-2/4 p-4">{children}</div>
      </div>
      <div className="h-full xl:hidden">{children}</div>
    </>
  );
};

export default layout;
