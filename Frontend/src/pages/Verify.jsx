import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/vendors"; // Update if needed

const VendorVerification = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingVendors();
  }, []);

  const fetchPendingVendors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pending`);
      setVendors(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      setError("Failed to fetch vendors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (id, status) => {
    try {
      await axios.post(
        `${API_BASE_URL}/${status}/${id}`,
        {}, // Empty body
        {
          headers: {
            role: "admin", //  Send admin role
          },
        }
      );
      setVendors((prevVendors) => prevVendors.filter((vendor) => vendor.id !== id));
    } catch (error) {
      console.error(`Error updating vendor status to ${status}:`, error);
      setError(`Failed to ${status} vendor. Make sure you are an admin.`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Vendor Verification</h2>

      {loading && <p className="text-gray-600 text-center">Loading vendors...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {vendors.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Business</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{vendor.id}</td>
                <td className="border border-gray-300 px-4 py-2">{vendor.name}</td>
                <td className="border border-gray-300 px-4 py-2">{vendor.business}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600"
                    onClick={() => handleVerification(vendor.id, "verify")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleVerification(vendor.id, "reject")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="text-gray-600 text-center">No pending vendors.</p>
      )}
    </div>
  );
};

export default VendorVerification;
