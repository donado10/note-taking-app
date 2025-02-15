import { MobileLayout, PageLayout } from "@/components/Layouts";
import TitlePage from "@/components/TitlePage";
import Image from "next/image";

export default function SearchPage() {
  return (
    <PageLayout>
      <div>
        <TitlePage title="Search" />
      </div>
    </PageLayout>
  );
}
