import { MobileLayout, PageLayout } from "@/components/Layouts";
import LayoutScreen from "@/components/LayoutScreen";
import TitlePage from "@/components/TitlePage";
import Image from "next/image";

export default function SettingsPage() {
  return (
    <LayoutScreen>
      <PageLayout>
        <div>
          <TitlePage title="Settings" />
        </div>
      </PageLayout>
    </LayoutScreen>
  );
}
