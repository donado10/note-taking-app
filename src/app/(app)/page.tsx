import { MobileLayout, PageLayout } from "@/components/Layouts";
import TitlePage from "@/components/TitlePage";
import Image from "next/image";

export default function HomePage() {
  return (
    <PageLayout>
      <div className="">
        <TitlePage title="All Notes" />
      </div>
    </PageLayout>
  );
}
