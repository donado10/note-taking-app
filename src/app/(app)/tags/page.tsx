import { MobileLayout, PageLayout } from "@/components/Layouts";
import LayoutScreen from "@/components/LayoutScreen";
import TitlePage from "@/components/TitlePage";
import Image from "next/image";

export default function TagsPage() {
  return (
    <LayoutScreen>
      <PageLayout>
        <div>
          <TitlePage title="Tags" />
        </div>
      </PageLayout>
    </LayoutScreen>
  );
}
