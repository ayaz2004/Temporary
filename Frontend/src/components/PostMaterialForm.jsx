import React, { useState } from "react";

const PostMaterialForm = ({ addMaterial }) => {
  const [material, setMaterial] = useState({ name: "", description: "", image: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!material.name || !material.description || !material.image) {
      alert("All fields are required!");
      return;
    }
    addMaterial(material);
    setMaterial({ name: "", description: "", image: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Material Name"
        value={material.name}
        onChange={(e) => setMaterial({ ...material, name: e.target.value })}
        className="w-full p-2 border rounded-md"
      />
      <textarea
        placeholder="Description"
        value={material.description}
        onChange={(e) => setMaterial({ ...material, description: e.target.value })}
        className="w-full p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={material.image}
        onChange={(e) => setMaterial({ ...material, image: e.target.value })}
        className="w-full p-2 border rounded-md"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md">
        Post Material
      </button>
    </form>
  );
};

export default PostMaterialForm;
