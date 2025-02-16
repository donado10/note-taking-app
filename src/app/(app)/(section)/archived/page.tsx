import Content from "@/components/Content";
import { PageLayout } from "@/components/Layouts";
import TitlePage from "@/components/TitlePage";
import Image from "next/image";

export default function ArchivePage() {
  return (
    <PageLayout>
      <Content section="archived" />
    </PageLayout>
  );
}
