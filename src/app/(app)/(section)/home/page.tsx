import MobileNavigationContainer from "@/components/navigation/MobileNavigationContainer";

export default function HomePage() {
  return (
    <>
      <div className="relative h-full xl:hidden">
        <MobileNavigationContainer />
      </div>
    </>
  );
}
