import { MobileLayout, PageLayout } from "@/components/Layouts";
import LayoutScreen from "@/components/LayoutScreen";
import TitlePage from "@/components/TitlePage";
import Image from "next/image";

export default function HomePage() {
  return (
    <LayoutScreen>
      <PageLayout>
        <div className="">
          <TitlePage title="All Notes" />
        </div>
      </PageLayout>
    </LayoutScreen>
  );
}
