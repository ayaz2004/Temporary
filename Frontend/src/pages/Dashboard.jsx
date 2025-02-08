import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import AddWaste from "../components/AddWaste";
import WasteCollection from "../components/WasteCollection";
import WorkArea from "../components/WorkArea";
import Report from "../components/Report";
import AddProduct from "../components/AddProduct";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === "profile" && <DashProfile />}
      {tab === "add-waste" && <AddWaste />}
      {tab === "add-product" && <AddProduct />}
      {tab === "waste-collection" && <WasteCollection />}
      {tab === "work-area" && <WorkArea />}
      {tab === "reports" && <Report />}
    </div>
  );
}
