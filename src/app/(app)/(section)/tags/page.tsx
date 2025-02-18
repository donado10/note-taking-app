import { PageLayout } from "@/components/Layouts";
import TagsNavigation, {
  TagsNavigationMobile,
} from "@/components/navigation/TagsNavigation";
import TitlePage from "@/components/TitlePage";
import Image from "next/image";

export default function TagsPage() {
  return (
    <div className="xl:hidden">
      {" "}
      <TagsNavigationMobile />
    </div>
  );
}
