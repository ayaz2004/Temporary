import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { Trash2, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 🚀 Redirect if not logged in

const UserDashboard = () => {
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Used for redirection

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail"); // Get user email from storage

    if (!userEmail) {
      navigate("/login"); // Redirect to login if no user is logged in
      return;
    }

    const fetchUserStats = async () => {
      try {
        console.log(`Fetching data for user: ${userEmail}`);
        const encodedEmail = encodeURIComponent(userEmail);
        const response = await axios.get(`http://localhost:3000/api/user/dashboard/${encodedEmail}`);

        console.log("API Response:", response.data);
        setUserStats(response.data);
      } catch (err) {
        console.error("Error fetching user dashboard data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [navigate]); // Only runs when component mounts

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Waste Posted Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Trash2 className="mr-3 text-green-500" />
            <h2 className="text-xl font-semibold">Waste Posted</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userStats?.wastePosted || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Waste Collected Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <CheckCircle className="mr-3 text-blue-500" />
            <h2 className="text-xl font-semibold">Waste Collected</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userStats?.wasteCollected || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
