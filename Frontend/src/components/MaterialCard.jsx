import React from "react";

const MaterialCard = ({ material, handleCollect }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <img src={material.image} alt={material.name} className="w-full h-40 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-semibold text-gray-700">{material.name}</h2>
      <p className="text-gray-500">{material.description}</p>

      <div className="mt-4">
        {material.status === "collected" ? (
          <span className="text-green-700 font-semibold">✅ Collected</span>
        ) : (
          <button
            onClick={() => handleCollect(material.id)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            Mark as Collected
          </button>
        )}
      </div>
    </div>
  );
};

export default MaterialCard;
