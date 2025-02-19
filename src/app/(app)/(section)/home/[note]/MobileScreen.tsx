import { INote } from "@/app/actions";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import IconArrowLeft from "@/assets/images/icon-arrow-left.svg";
import IconDelete from "@/assets/images/icon-delete.svg";
import IconArchive from "@/assets/images/icon-archive.svg";
import { useRouter } from "next/navigation";

const MobileScreen = ({ note }: { note: INote }) => {
  const router = useRouter();
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
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
          <span>Go Back</span>
        </button>
        <div className="flex items-center gap-8 text-gray-500">
          <button className="">
            <span>
              <Image src={IconDelete} alt="" />
            </span>
          </button>
          <button>
            <span>
              <Image src={IconArchive} alt="" />
            </span>
          </button>
          <button>
            <span>Cancel</span>
          </button>
          <button>
            <span className="text-notes-blue-secondary">Save Note</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileScreen;
