import MobileNavigationContainer from "@/components/navigation/MobileNavigationContainer";

export default function HomePage() {
  return (
    <>
      {
        <div className="xl:hidden">
          <MobileNavigationContainer />
        </div>
      }
      {<div className="xs:hidden xl:block"></div>}
    </>
  );
}
