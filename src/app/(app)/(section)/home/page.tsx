import MobileNavigationContainer from "@/components/navigation/MobileNavigationContainer";

export default function HomePage() {
  return (
    <>
      <div className="relative h-full overflow-scroll xl:hidden">
        <MobileNavigationContainer />
      </div>
    </>
  );
}
