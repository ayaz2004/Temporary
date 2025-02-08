import { useState } from "react";
import { Button, Spinner, TextInput, Textarea } from "flowbite-react";
import { FaCloudUploadAlt, FaPlus, FaSave, FaTimes } from "react-icons/fa";

// Utility: Convert file to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Utility: Get prediction with highest confidence
const getMaxConfidencePrediction = (predictions) => {
  if (!predictions || predictions.length === 0) return null;
  return predictions.reduce(
    (max, prediction) =>
      prediction.confidence > max.confidence ? prediction : max,
    predictions[0]
  );
};

const AddProductSection = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictedCategory, setPredictedCategory] = useState("");

  const predictCategory = async (file) => {
    try {
      const base64Image = await convertToBase64(file);
      const API_KEY = import.meta.env.VITE_ROBOFLOW_API_KEY;
      const MODEL_ENDPOINT = import.meta.env.VITE_MODEL_ENDPOINT;

      const response = await fetch(`${MODEL_ENDPOINT}?api_key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: base64Image,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const maxPrediction = getMaxConfidencePrediction(data.predictions);
      const predicted = maxPrediction ? maxPrediction.class : "";
      setPredictedCategory(predicted);
    } catch (error) {
      console.error("Prediction error:", error);
      setPredictedCategory("");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setPreview(URL.createObjectURL(file));
      await predictCategory(file);
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
      formData.append("predictedCategory", predictedCategory);

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
      setPredictedCategory("");
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
          {predictedCategory && (
            <p className="mt-2 text-green-400">
              Predicted Category: {predictedCategory}
            </p>
          )}
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
              setPredictedCategory("");
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
