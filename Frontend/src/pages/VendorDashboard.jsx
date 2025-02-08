import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Truck } from "lucide-react";
import { jwtDecode } from "jwt-decode";

// import { useParams } from "react-router-dom";

const VendorDashboard = () => {
  // const { vendorName } = useParams(); 
  const [vendorStats, setVendorStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("vendorToken");

  useEffect(() => {
    if (!token) return;

    const { vendorName } = jwtDecode(token); // Extract vendor's name from JWT

    const fetchVendorStats = async () => {
      try {
        const encodedVendor = encodeURIComponent(vendorName);
        const response = await axios.get(`http://localhost:3000/api/vendor/dashboard/${encodedVendor}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setVendorStats(response.data.collectionHistory || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchVendorStats();
  }, [token]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Vendor Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Truck className="mr-3 text-green-500" />
          <h2 className="text-xl font-semibold">{vendorStats.vendorName}'s Collection History</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={vendorStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="collections" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VendorDashboard;
