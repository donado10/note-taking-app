"use client";
import React, { useRef } from "react";
import Image from "next/image";
import IconSearch from "@/assets/images/icon-search.svg";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

const SearchNote = (props: Props) => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const router = useRouter();
  const pathname = usePathname();

  const submitHandler = (event: SubmitEvent) => {
    event.preventDefault();
    const text = inputRef.current.value;
    router.push(pathname + "/" + "?q=" + text);
    return;
  };
  return (
    <form
      onSubmit={submitHandler as any}
      className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border-[1px] p-2"
    >
      <span>
        <Image src={IconSearch} alt="" />
      </span>
      <input
        type="text"
        className="w-full border-none outline-none"
        placeholder="Search by title, content, or tags…"
        ref={inputRef}
      />
    </form>
  );
};

export default SearchNote;
