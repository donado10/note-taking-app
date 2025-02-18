import MobileNavigationContainer from "@/components/navigation/MobileNavigationContainer";

export default function TagPage() {
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
