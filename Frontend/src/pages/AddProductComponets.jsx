import { useState } from "react";
import { Button, Spinner, TextInput, Textarea } from "flowbite-react";
import { FaPlus, FaSave, FaTimes } from "react-icons/fa";

const AddProductSection = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !productDescription || !productImage) return;

    setLoading(true);
    try {
      // Simulate API call or form submission
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("image", productImage);

      // Replace with your actual API endpoint
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      // Reset form after successful submission
      setProductName("");
      setProductDescription("");
      setProductImage(null);
      setPreview(null);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-green-500/20">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FaPlus className="text-green-500" />
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product Name
          </label>
          <TextInput
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product Description
          </label>
          <Textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter product description"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product Image
          </label>
          <div className="relative rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer bg-gray-700/50 hover:bg-gray-700/70">
            <input
              type="file"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              required
            />
            {preview ? (
              <img
                src={preview}
                alt="Product Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            ) : (
              <div className="space-y-4">
                <FaCloudUploadAlt className="mx-auto text-4xl text-green-500" />
                <p className="text-gray-300">Click to upload product image</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            color="failure"
            onClick={() => {
              setProductName("");
              setProductDescription("");
              setProductImage(null);
              setPreview(null);
            }}
            disabled={loading}
          >
            <FaTimes className="mr-2" />
            Clear
          </Button>
          <Button
            type="submit"
            gradientDuoTone="greenToBlue"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <span>Saving...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FaSave />
                <span>Save Product</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductSection;