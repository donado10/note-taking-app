import MobileNavigationContainer from "@/components/MobileNavigationContainer";

export default function ArchivedPage() {
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
