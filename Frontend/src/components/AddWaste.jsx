import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextInput, Select, Textarea, Button } from "flowbite-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaBox,
  FaMoneyBillWave,
  FaImage,
  FaFileAlt,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

export default function AddWaste() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [wastes, setWastes] = useState([]);
  const [loadingWastes, setLoadingWastes] = useState(true);

  useEffect(() => {
    const fetchUserWastes = async () => {
      try {
        const res = await fetch(`/api/product/user/${currentUser._id}`);
        const data = await res.json();

        if (res.ok) {
          setWastes(data.data);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch waste items");
      } finally {
        setLoadingWastes(false);
      }
    };

    fetchUserWastes();
  }, [currentUser._id]);

  const [formData, setFormData] = useState({
    category: "biodegradable",
    quantity: "",
    price: "",
    description: "",
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    try {
      setLoading(true);
      const imageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const base64 = await convertToBase64(file);
          return base64;
        })
      );

      const res = await fetch(`/api/product/add/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          images: imageUrls,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success("Waste added successfully!");
        navigate("/dashboard?tab=waste-collection");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-b from-gray-900 via-green-900 to-teal-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
            Add Waste
          </h1>
          <p className="text-gray-400 mt-2">List your waste for collection</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Waste Type <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                  className="bg-gray-900/50 border-gray-700 text-gray-200"
                >
                  <option value="electronic">Electronic</option>
                  <option value="plastic">Plastic</option>
                  <option value="clothes">Clothes</option>
                  <option value="glass">Glass</option>
                  <option value="biodegradable">Biodegradable</option>
                  <option value="paper">Paper</option>
                </Select>
              </div>

              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaBox className="absolute left-3 top-3 text-green-500" />
                  <TextInput
                    type="text"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    placeholder="e.g., 5 kg"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaMoneyBillWave className="absolute left-3 top-3 text-green-500" />
                  <TextInput
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>

              <div className="group">
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
                    placeholder="Describe your waste"
                    required
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 shadow-xl">
            <h2 className="text-xl font-semibold text-green-400 mb-4">
              Images <span className="text-red-500">*</span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {images.map((preview, index) => (
                  <div key={index} className="relative group">
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
                  </div>
                ))}
                {images.length < 5 && (
                  <label className="w-32 h-32 flex flex-col items-center justify-center border-4 border-dashed border-green-500/30 rounded-lg cursor-pointer hover:border-green-500/50 transition-all">
                    <FaImage className="w-8 h-8 text-green-500/50" />
                    <span className="mt-2 text-sm text-gray-400">
                      Add Image
                    </span>
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
            </div>
          </div>

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
                  Adding Waste...
                </div>
              ) : (
                "Add Waste"
              )}
            </Button>
          </motion.div>
        </form>
        {/* Add Waste List Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-green-400 mb-6">
            Your Waste Items
          </h2>

          {loadingWastes ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="w-8 h-8 border-t-2 border-b-2 border-green-500 rounded-full animate-spin" />
            </div>
          ) : wastes.length === 0 ? (
            <div className="text-center text-gray-400 py-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-green-500/20">
              No waste items added yet
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {wastes.map((waste) => (
                <motion.div
                  key={waste._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-green-500/20"
                >
                  <div className="flex gap-4">
                    <img
                      src={waste.images[0]}
                      alt={waste.category}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-green-400 capitalize">
                            {waste.category}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Quantity: {waste.quantity}
                          </p>
                          <p className="text-gray-400 text-sm">
                            Price: ₹{waste.price}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            color="gray"
                            className="!bg-gray-700/50"
                            onClick={() => {
                              /* Handle edit */
                            }}
                          >
                            <FaEdit className="text-green-400" />
                          </Button>
                          <Button
                            size="sm"
                            color="gray"
                            className="!bg-gray-700/50"
                            onClick={() => {
                              /* Handle delete */
                            }}
                          >
                            <FaTrash className="text-red-400" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                        {waste.description}
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        Added on:{" "}
                        {new Date(waste.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
