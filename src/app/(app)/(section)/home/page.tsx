import MobileNavigationContainer from "@/components/navigation/MobileNavigationContainer";

export default function HomePage() {
  return (
    <>
      <div className="h-full xl:hidden">
        <MobileNavigationContainer />
      </div>
    </>
  );
}
