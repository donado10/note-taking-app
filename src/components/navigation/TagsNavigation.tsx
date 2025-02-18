"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { getTags } from "@/app/actions";
import { usePathname } from "next/navigation";
import Image from "next/image";
import IconTag from "@/assets/images/icon-tag.svg";

const TagsNavigation = () => {
  const [tagNav, setTagNav] = useState<string[]>([]);
  const location = usePathname();

  useEffect(() => {
    const tagHandler = async () => {
      const tags = await getTags();
      setTagNav(Array.from(new Set(tags)));
    };
    tagHandler();
  }, []);
  return (
    <>
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
    </>
  );
};
export const TagsNavigationMobile = () => {
  const [tagNav, setTagNav] = useState<string[]>([]);
  const location = usePathname();

  useEffect(() => {
    const tagHandler = async () => {
      const tags = await getTags();
      setTagNav(Array.from(new Set(tags)));
    };
    tagHandler();
  }, []);
  return (
    <ul className="mt-4 flex flex-col">
      {tagNav.map((tag, i) => {
        return (
          <li key={i} className="items-center border-b-[1px]">
            <Link
              href={`/tags/${tag.toLowerCase()}`}
              className={`flex w-full items-center justify-between rounded-md px-1 py-6 hover:bg-notes-blue-third ${location.split("/")[2] === tag.toLowerCase() ? "bg-notes-blue-third" : ""}`}
            >
              <div className="flex items-center gap-4">
                <Image src={IconTag} alt="" />
                <span>{tag}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TagsNavigation;
