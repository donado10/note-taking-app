import Image from "next/image";
import IconArrowLeft from "@/assets/images/icon-arrow-left.svg";
import IconDelete from "@/assets/images/icon-delete.svg";
import IconArchive from "@/assets/images/icon-archive.svg";
import IconTags from "@/assets/images/icon-tag.svg";
import IconClock from "@/assets/images/icon-clock.svg";
import { useRouter } from "next/navigation";

export const NoteHeader = () => {
  const router = useRouter();

  return (
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
  );
};

export const NoteMetadata = ({
  title,
  tags,
  lastEdited,
}: {
  title: string;
  tags: string;
  lastEdited: string;
}) => {
  return (
    <div className="border-b-[1px] pb-4">
      <h1 className="mb-4 text-2xl font-bold">{title}</h1>
      <div className="mb-2 flex items-center">
        <div className="flex w-40 items-center gap-2">
          <Image src={IconTags} alt="" />
          <span>Tags</span>
        </div>
        <span>{tags}</span>
      </div>
      <div className="flex items-center">
        <div className="flex w-40 items-center gap-2">
          <Image src={IconClock} alt="" />
          <span>Last edited</span>
        </div>
        <span>{lastEdited}</span>
      </div>
    </div>
  );
};

export const NoteText = ({ content }: { content: string }) => {
  return (
    <div className="w-full flex-grow border-b-[1px] pb-4">
      <textarea
        className="h-full w-full outline-none"
        defaultValue={content}
        name=""
        id=""
      ></textarea>
    </div>
  );
};

export const NoteFooter = () => {
  return <></>;
};
