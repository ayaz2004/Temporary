import { useState } from "react";
import { useSelector } from "react-redux";
import { TextInput, Select, Textarea, Button } from "flowbite-react";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaStar,
  FaImage,
  FaFileAlt,
  FaTrash,
  FaEdit,
  FaTag,
} from "react-icons/fa";

export default function AddProduct() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  // Dummy products data
  const [products] = useState([
    {
      _id: "1",
      title: "Used Mouse",
      category: "electronics",
      condition: "good",
      points: 3500,
      description:
        "Used for 1 year, in excellent condition with all accessories",
      images: ["https://placekitten.com/200/200"],
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "Wooden Study Table",
      category: "furniture",
      condition: "fair",
      points: 250,
      description: "Solid wood study table, some wear and tear but sturdy",
      images: ["https://placekitten.com/201/201"],
      createdAt: new Date(),
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    category: "electronics",
    condition: "good",
    points: "",
    description: "",
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Product added successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-b from-gray-900 via-green-900 to-teal-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
            Add Used Product
          </h1>
          <p className="text-gray-400 mt-2">
            List your items for recycling points
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 shadow-xl"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaTag className="absolute left-3 top-3 text-green-500" />
                  <TextInput
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    placeholder="Product title"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Category <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                  className="bg-gray-900/50 border-gray-700 text-gray-200"
                >
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  <option value="sports">Sports Equipment</option>
                </Select>
              </div>

              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Points <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaStar className="absolute left-3 top-3 text-green-500" />
                  <TextInput
                    type="number"
                    value={formData.points}
                    onChange={(e) =>
                      setFormData({ ...formData, points: e.target.value })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    placeholder="Enter points"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Condition <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.condition}
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                  required
                  className="bg-gray-900/50 border-gray-700 text-gray-200"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </Select>
              </div>

              <div className="col-span-2">
                <label className="text-gray-400 mb-2 block">
                  Description <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaFileAlt className="absolute left-3 top-3 text-green-500" />
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    placeholder="Describe your product"
                    required
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 shadow-xl"
          >
            <h2 className="text-xl font-semibold text-green-400 mb-4">
              Product Images <span className="text-red-500">*</span>
            </h2>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {images.map((preview, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group"
                >
                  <img
                    src={preview}
                    alt={`preview ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-lg border-4 border-green-500/30"
                  />
                  <div
                    onClick={() => {
                      setImages(images.filter((_, i) => i !== index));
                      setImageFiles(imageFiles.filter((_, i) => i !== index));
                    }}
                    className="absolute inset-0 bg-black/50 items-center justify-center hidden group-hover:flex rounded-lg cursor-pointer"
                  >
                    <span className="text-white">Remove</span>
                  </div>
                </motion.div>
              ))}
              {images.length < 5 && (
                <label className="w-32 h-32 flex flex-col items-center justify-center border-4 border-dashed border-green-500/30 rounded-lg cursor-pointer hover:border-green-500/50 transition-all">
                  <FaImage className="w-8 h-8 text-green-500/50" />
                  <span className="mt-2 text-sm text-gray-400">Add Image</span>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                    multiple
                    max="5"
                  />
                </label>
              )}
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              gradientDuoTone="greenToBlue"
              className="w-full py-3 font-semibold text-lg"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                  Adding Product...
                </div>
              ) : (
                "Add Product"
              )}
            </Button>
          </motion.div>
        </form>

        {/* Product List Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold text-green-400 mb-6">
            Your Listed Products
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-green-500/20"
              >
                <div className="flex gap-4">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-green-400">
                          {product.title}
                        </h3>
                        <p className="text-gray-400 text-sm capitalize">
                          {product.category} • {product.condition}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {product.points} Points
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          color="gray"
                          className="!bg-gray-700/50"
                        >
                          <FaEdit className="text-green-400" />
                        </Button>
                        <Button
                          size="sm"
                          color="gray"
                          className="!bg-gray-700/50"
                        >
                          <FaTrash className="text-red-400" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      Added on:{" "}
                      {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
