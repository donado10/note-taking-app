import { PageLayout } from "@/components/Layouts";
import MobileSettingNav from "@/components/Settings/MobileSettingNav";
import Link from "next/link";
import IconLogout from "@/assets/images/icon-logout.svg";
import Image from "next/image";
import TitlePage from "@/components/TitlePage";

export default function SettingsPage() {
  return (
    <div className="xl:hidden">
      <TitlePage />
      <div className="border-b-2 pb-4">
        <MobileSettingNav />
      </div>
      <div>
        <Link
          href={`/logout`}
          className={`flex w-full items-center justify-between rounded-md px-1 py-4 hover:bg-notes-blue-third`}
        >
          <div className="flex items-center gap-4">
            <Image src={IconLogout} alt="" />
            <span>Logout</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
