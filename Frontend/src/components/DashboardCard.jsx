// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   // Step 1: Create state to store the dashboard data
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalVendors, setTotalVendors] = useState(0);
//   const [totalWastePosted, setTotalWastePosted] = useState(0);
//   const [totalWasteCollected, setTotalWasteCollected] = useState(0);
//   const [pendingWaste, setPendingWaste] = useState(0);

//   // Step 2: Fetch data from backend when component loads
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/dashboard"); // Replace with your actual API URL

//         // Step 3: Extract values and store them in state
//         setTotalUsers(response.data.adminStats.totalUsers);
//         setTotalVendors(response.data.adminStats.totalVendors);
//         setTotalWastePosted(response.data.adminStats.totalWastePosted);
//         setTotalWasteCollected(response.data.adminStats.totalWasteCollected);
//         setPendingWaste(response.data.adminStats.pendingWaste);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>Total Users: {totalUsers}</p>
//       <p>Total Vendors: {totalVendors}</p>
//       <p>Total Waste Posted: {totalWastePosted}</p>
//       <p>Total Waste Collected: {totalWasteCollected}</p>
//       <p>Pending Waste: {pendingWaste}</p>
//     </div>
//   );
// };

// export default Dashboard;
