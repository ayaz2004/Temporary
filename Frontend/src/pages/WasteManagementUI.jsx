import React, { useState, useEffect } from "react";
import PostMaterialForm from "../components/PostMaterialForm";
import MaterialCard from "../components/MaterialCard";

const WasteManagementUI = () => {
  const [materials, setMaterials] = useState([]);

  // Fetch materials from backend
  useEffect(() => {
    fetch("http://localhost:3000/materials")
      .then((res) => res.json())
      .then((data) => setMaterials(data))
      .catch((err) => console.error("Error fetching materials:", err));
  }, []);

  // Add new material
  const addMaterial = (material) => {
    fetch("http://localhost:3000/materials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...material, status: "pending" }),
    })
      .then((res) => res.json())
      .then((newMaterial) => setMaterials([...materials, newMaterial]))
      .catch((err) => console.error("Error posting material:", err));
  };

  // Mark material as collected
  const handleCollect = (id) => {
    fetch(`http://localhost:3000/materials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "collected" }),
    })
      .then((res) => res.json())
      .then(() => {
        setMaterials(
          materials.map((material) =>
            material.id === id ? { ...material, status: "collected" } : material
          )
        );
      })
      .catch((err) => console.error("Error updating material:", err));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center bg-green-600 text-white p-4 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">♻️ My Portal</h1>
        <span className="bg-white text-green-700 px-4 py-2 rounded-full text-sm font-semibold shadow-md">
          Total Materials: {materials.length}
        </span>
      </header>

      {/* Post Material Form */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Post New Material</h2>
        <PostMaterialForm addMaterial={addMaterial} />
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.length === 0 ? (
          <p className="text-gray-500 text-lg col-span-full text-center">
            No materials posted yet. Start by adding one! 🚀
          </p>
        ) : (
          materials.map((material) => (
            <MaterialCard key={material.id} material={material} handleCollect={handleCollect} />
          ))
        )}
      </div>
    </div>
  );
};

export default WasteManagementUI;
