import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import IconArrowLeft from "@/assets/images/icon-arrow-left.svg";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-2 text-gray-500"
      onClick={() => {
        router.back();
        router.refresh();
      }}
    >
      <span>
        <Image src={IconArrowLeft} alt="" />
      </span>
      <span>Settings</span>
    </button>
  );
};

export default BackButton;
