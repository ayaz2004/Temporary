import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiTruck,
  HiDocumentReport,
  HiLocationMarker,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import WasteCollection from '../components/WasteCollection';
export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hover: {
      x: 5,
      transition: { duration: 0.2 },
    },
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        dispatch(signoutSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="h-full"
    >
      <Sidebar className="w-full md:w-56 bg-gray-900/50 backdrop-blur-sm border-r border-green-500/20 min-h-screen">
        <div className="px-4 py-6 border-b border-green-500/20">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 mb-2">
            Dashboard
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full" />
        </div>

        <Sidebar.Items className="py-4">
          <Sidebar.ItemGroup>
            <motion.div variants={itemVariants} whileHover="hover">
              <Link to="/dashboard?tab=profile">
                <Sidebar.Item
                  active={tab === "profile"}
                  icon={HiUser}
                  className={`${
                    tab === "profile"
                      ? "bg-green-500/20 text-green-400 border-r-4 border-green-500"
                      : "text-gray-300 hover:text-green-500 hover:bg-gray-800/50"
                  } transition-all duration-200`}
                  as="div"
                >
                  Profile
                </Sidebar.Item>
              </Link>
            </motion.div>

            {currentUser?.role === "user" && (
              <motion.div variants={itemVariants} whileHover="hover">
                <Link to="/dashboard?tab=add-waste">
                  <Sidebar.Item
                    active={tab === "add-waste"}
                    icon={HiTruck}
                    className={`${
                      tab === "waste-collection"
                        ? "bg-green-500/20 text-green-400 border-r-4 border-green-500"
                        : "text-gray-300 hover:text-green-500 hover:bg-gray-800/50"
                    } transition-all duration-200`}
                    as="div"
                  >
                    Add Waste
                  </Sidebar.Item>
                </Link>
              </motion.div>
            )}

            <motion.div variants={itemVariants} whileHover="hover">
              <Link to="/dashboard?tab=waste-collection">
                <Sidebar.Item
                  active={tab === "waste-collection"}
                  icon={HiTruck}
                  className={`${
                    tab === "waste-collection"
                      ? "bg-green-500/20 text-green-400 border-r-4 border-green-500"
                      : "text-gray-300 hover:text-green-500 hover:bg-gray-800/50"
                  } transition-all duration-200`}
                  as="div"
                >
                  Waste Collection
                </Sidebar.Item>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants} whileHover="hover">
              <Link to="/dashboard?tab=work-area">
                <Sidebar.Item
                  active={tab === "work-area"}
                  icon={HiLocationMarker}
                  className={`${
                    tab === "work-area"
                      ? "bg-green-500/20 text-green-400 border-r-4 border-green-500"
                      : "text-gray-300 hover:text-green-500 hover:bg-gray-800/50"
                  } transition-all duration-200`}
                  as="div"
                >
                  Work Area
                </Sidebar.Item>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants} whileHover="hover">
              <Link to="/dashboard?tab=reports">
                <Sidebar.Item
                  active={tab === "reports"}
                  icon={HiDocumentReport}
                  className={`${
                    tab === "reports"
                      ? "bg-green-500/20 text-green-400 border-r-4 border-green-500"
                      : "text-gray-300 hover:text-green-500 hover:bg-gray-800/50"
                  } transition-all duration-200`}
                  as="div"
                >
                  Reports
                </Sidebar.Item>
              </Link>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              className="mt-8"
            >
              <Sidebar.Item
                icon={HiArrowSmRight}
                onClick={handleSignout}
                className="cursor-pointer text-gray-300 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200"
              >
                Sign Out
              </Sidebar.Item>
            </motion.div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </motion.div>
  );
}
