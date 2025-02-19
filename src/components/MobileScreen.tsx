import { INote } from "@/app/actions";
import React from "react";
import Image from "next/image";
import IconArrowLeft from "@/assets/images/icon-arrow-left.svg";
import IconDelete from "@/assets/images/icon-delete.svg";
import IconArchive from "@/assets/images/icon-archive.svg";
import IconTags from "@/assets/images/icon-tag.svg";
import IconClock from "@/assets/images/icon-clock.svg";
import { useRouter } from "next/navigation";

const MobileScreen = ({ note }: { note: INote }) => {
  const router = useRouter();
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between border-b-[1px] pb-4">
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
      <div className="border-b-[1px] pb-4">
        <h1 className="mb-4 text-2xl font-bold">{note.title}</h1>
        <div className="mb-2 flex items-center">
          <div className="flex w-40 items-center gap-2">
            <Image src={IconTags} alt="" />
            <span>Tags</span>
          </div>
          <span>{note.tags.join(", ")}</span>
        </div>
        <div className="flex items-center">
          <div className="flex w-40 items-center gap-2">
            <Image src={IconClock} alt="" />
            <span>Last edited</span>
          </div>
          <span>{note.lastEdited}</span>
        </div>
      </div>
      <div className="w-full flex-grow">
        <textarea
          className="h-full w-full outline-none"
          defaultValue={note.content}
          name=""
          id=""
        ></textarea>
      </div>
    </div>
  );
};

export default MobileScreen;
