import { MobileLayout, PageLayout } from "@/components/Layouts";
import LayoutScreen from "@/components/LayoutScreen";
import TitlePage from "@/components/TitlePage";
import Image from "next/image";

export default function SearchPage() {
  return (
    <LayoutScreen>
      <PageLayout>
        <div>
          <TitlePage title="Search" />
        </div>
      </PageLayout>
    </LayoutScreen>
  );
}
