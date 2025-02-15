import { MobileLayout, PageLayout } from "@/components/Layouts";
import TitlePage from "@/components/TitlePage";
import Image from "next/image";

export default function ArchivePage() {
  return (
    <PageLayout>
      <div>
        <TitlePage title="Archived Notes" />
      </div>
    </PageLayout>
  );
}
