import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { Users, Truck, Trash2 } from "lucide-react";
import axios from "axios";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend when the component mounts
  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/api/user/test");
  //       setDashboardData(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Failed to load dashboard data.");
  //       setLoading(false);
  //     }
  //   };

  //   fetchDashboardData();
  // }, []);


  useEffect(() => {
    axios.get("http://localhost:3000/api/dashboard")
      .then((response) => {
        setDashboardData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load dashboard data.");
        setLoading(false);
      });
  }, []);


  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const { totalUsers, totalVendors, totalWastePosted, totalWasteCollected, pendingWaste } = dashboardData;

  const wasteStatusData = [
    { name: "Collected", value: totalWasteCollected },
    { name: "Pending", value: pendingWaste },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-200 min-h-screen text-gray-800">
      <div className="relative">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-900">
          Admin Dashboard
        </h1>

        {/* Verify Vendor Button */}
        <div className="absolute top-0 right-0 p-4">
          <Link to="/verification">
            <button className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Verify Vendor
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <DashboardCard icon={Users} title="Total Users" value={totalUsers} />
        <DashboardCard icon={Truck} title="Total Vendors" value={totalVendors} />
        <DashboardCard icon={Trash2} title="Total Waste Posted" value={totalWastePosted} />
      </div>

      {/* Waste Status Pie Chart */}
      <div className="bg-green-100 p-8 rounded-xl shadow-lg col-span-full lg:col-span-3 hover:shadow-2xl transform hover:scale-105 transition-all ease-in-out duration-300">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Waste Collection Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={wasteStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {wasteStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Reusable Stats Card Component
const DashboardCard = ({ icon: Icon, title, value }) => (
  <div className="bg-green-400 p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all ease-in-out duration-300">
    <div className="flex items-center mb-4">
      <Icon className="mr-4 text-white text-3xl" />
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
    </div>
    <p className="text-4xl font-bold text-white">{value}</p>
  </div>
);

export default AdminDashboard;
