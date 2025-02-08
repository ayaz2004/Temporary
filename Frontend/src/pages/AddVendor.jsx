import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, TextInput, Select, Textarea } from "flowbite-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaStore,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
  FaRecycle,
  FaBuilding,
  FaClipboardCheck,
  FaUserTie,
  FaEnvelope,
  FaMoneyBillWave,
  FaImage,
} from "react-icons/fa";

export default function AddVendor() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const wasteType = {
    electronic: "electronic",
    plastic: "plastic",
    clothes: "clothes",
    glass: "glass",
    biodegradable: "biodegradable",
    paper: "paper",
  };

  const [formData, setFormData] = useState({
    name: currentUser?.username || "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
    businessLicense: "",
    establishedYear: new Date().getFullYear(),
    operatingAreas: [],
    wasteTypes: [],
    specialization: "",
    availableTime: "",
    responseTime: "",
    price: "",
    servicesOffered: [],
    certifications: [],
    environmentalCompliance: false,
    safetyStandards: [],
    vehicleTypes: [],
    processingCapacity: "",
    recyclingMethods: [],
    rating: 0,
    reviews: 0,
    completedPickups: 0,
    collectedWaste: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = {
      name: "Business Name",
      email: "Email",
      phone: "Phone Number",
      address: "Business Address",
      availableTime: "Operating Hours",
      responseTime: "Response Time",
      price: "Price Range",
      wasteTypes: "Waste Types",
    };

    const missingFields = Object.entries(requiredFields).filter(
      ([key]) =>
        !formData[key] ||
        (Array.isArray(formData[key]) && formData[key].length === 0)
    );

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields
          .map(([_, label]) => label)
          .join(", ")}`
      );
      return;
    }

    if (!imageFile) {
      toast.error("Please upload a shop image");
      return;
    }

    setLoading(true);
    try {
      const base64Image = imageFile ? await convertToBase64(imageFile) : null;
      const res = await fetch("/api/vendor/addVendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, image: base64Image }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success("Vendor profile created successfully!");
        navigate("/dashboard?tab=profile");
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-teal-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
            Vendor Registration
          </h1>
          <p className="text-gray-400 mt-2">
            Complete your vendor profile to start accepting waste collection
            requests
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 shadow-xl">
            <h2 className="text-xl font-semibold text-green-400 mb-4">
              Basic Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaStore className="absolute left-3 top-3 text-green-500" />
                  <TextInput
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-3 text-green-500" />
                  <TextInput
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="col-span-2">
                <label className="text-gray-400 mb-2 block">
                  Business Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-3 text-green-500" />
                  <Textarea
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    required
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 shadow-xl">
            <h2 className="text-xl font-semibold text-green-400 mb-4">
              Business Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Business License */}
              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Business License Number
                </label>
                <div className="relative">
                  <FaClipboardCheck className="absolute left-3 top-3 text-green-500" />
                  <TextInput
                    type="text"
                    value={formData.businessLicense}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessLicense: e.target.value,
                      })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    required
                  />
                </div>
              </div>

              {/* Operating Hours */}
              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Operating Hours <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaClock className="absolute left-3 top-3 text-green-500" />
                  <TextInput
                    type="text"
                    value={formData.availableTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availableTime: e.target.value,
                      })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    placeholder="e.g., 9 AM - 6 PM"
                    required
                  />
                </div>
              </div>

              {/* Response Time */}
              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Response Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaClock className="absolute left-3 top-3 text-green-500" />
                  <TextInput
                    type="text"
                    value={formData.responseTime}
                    onChange={(e) =>
                      setFormData({ ...formData, responseTime: e.target.value })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    placeholder="e.g., Within 2 hours"
                    required
                  />
                </div>
              </div>

              {/* Price Range */}
              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Price Range <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaMoneyBillWave className="absolute left-3 top-3 text-green-500" />
                  <TextInput
                    type="text"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    placeholder="e.g., ₹100-500 per kg"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 shadow-xl">
            <h2 className="text-xl font-semibold text-green-400 mb-4">
              Service Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Waste Types */}
              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Waste Types <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(wasteType).map(([key, value]) => (
                    <label
                      key={key}
                      className="flex items-center space-x-2 p-2 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={formData.wasteTypes.includes(value)}
                        onChange={(e) => {
                          const updatedTypes = e.target.checked
                            ? [...formData.wasteTypes, value]
                            : formData.wasteTypes.filter(
                                (type) => type !== value
                              );
                          setFormData({
                            ...formData,
                            wasteTypes: updatedTypes,
                          });
                        }}
                        className="w-4 h-4 text-green-500 bg-gray-900/50 border-gray-700 rounded focus:ring-green-500"
                      />
                      <span className="text-gray-300">{value}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Services Offered */}
                <div className="group">
                  <label className="text-gray-400 mb-2 block">
                    Services Offered
                  </label>
                  <div className="relative">
                    <FaTruck className="absolute left-3 top-3 text-green-500" />
                    <Textarea
                      value={formData.servicesOffered?.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          servicesOffered: e.target.value
                            .split(",")
                            .map((s) => s.trim()),
                        })
                      }
                      className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                      placeholder="Enter services separated by commas"
                    />
                  </div>
                </div>

                {/* Operating Areas */}
                <div className="group">
                  <label className="text-gray-400 mb-2 block">
                    Operating Areas <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-green-500" />
                    <Textarea
                      value={formData.operatingAreas?.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          operatingAreas: e.target.value
                            .split(",")
                            .map((s) => s.trim()),
                        })
                      }
                      className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                      placeholder="Enter areas separated by commas"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment & Capacity */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 shadow-xl">
            <h2 className="text-xl font-semibold text-green-400 mb-4">
              Equipment & Capacity
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Vehicle Types */}
              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Vehicle Types
                </label>
                <div className="relative">
                  <FaTruck className="absolute left-3 top-3 text-green-500" />
                  <Textarea
                    value={formData.vehicleTypes?.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        vehicleTypes: e.target.value
                          .split(",")
                          .map((s) => s.trim()),
                      })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    placeholder="Enter vehicle types separated by commas"
                  />
                </div>
              </div>

              {/* Processing Capacity */}
              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Processing Capacity
                </label>
                <div className="relative">
                  <FaRecycle className="absolute left-3 top-3 text-green-500" />
                  <TextInput
                    type="text"
                    value={formData.processingCapacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        processingCapacity: e.target.value,
                      })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    placeholder="e.g., 1000 kg per day"
                  />
                </div>
              </div>

              {/* Recycling Methods */}
              <div className="col-span-2">
                <label className="text-gray-400 mb-2 block">
                  Recycling Methods
                </label>
                <div className="relative">
                  <FaRecycle className="absolute left-3 top-3 text-green-500" />
                  <Textarea
                    value={formData.recyclingMethods?.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recyclingMethods: e.target.value
                          .split(",")
                          .map((s) => s.trim()),
                      })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    placeholder="Enter recycling methods separated by commas"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Certifications & Compliance */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 shadow-xl">
            <h2 className="text-xl font-semibold text-green-400 mb-4">
              Certifications & Compliance
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Certifications */}
              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Certifications
                </label>
                <div className="relative">
                  <FaClipboardCheck className="absolute left-3 top-3 text-green-500" />
                  <Textarea
                    value={formData.certifications?.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        certifications: e.target.value
                          .split(",")
                          .map((s) => s.trim()),
                      })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    placeholder="Enter certifications separated by commas"
                  />
                </div>
              </div>

              {/* Safety Standards */}
              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Safety Standards
                </label>
                <div className="relative">
                  <FaClipboardCheck className="absolute left-3 top-3 text-green-500" />
                  <Textarea
                    value={formData.safetyStandards?.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        safetyStandards: e.target.value
                          .split(",")
                          .map((s) => s.trim()),
                      })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    placeholder="Enter safety standards separated by commas"
                  />
                </div>
              </div>

              {/* Environmental Compliance */}
              <div className="group col-span-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.environmentalCompliance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        environmentalCompliance: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-green-500 bg-gray-900/50 border-gray-700 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-gray-400">
                    Environmental Compliance
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Shop Image Upload */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 shadow-xl">
            <h2 className="text-xl font-semibold text-green-400 mb-4">
              Shop Image <span className="text-red-500">*</span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                {imagePreview ? (
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="Shop preview"
                      className="w-64 h-64 object-cover rounded-lg border-4 border-green-500/30"
                    />
                    <div
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute inset-0 bg-black/50 items-center justify-center hidden group-hover:flex rounded-lg cursor-pointer"
                    >
                      <span className="text-white">Change Image</span>
                    </div>
                  </div>
                ) : (
                  <label className="w-64 h-64 flex flex-col items-center justify-center border-4 border-dashed border-green-500/30 rounded-lg cursor-pointer hover:border-green-500/50 transition-all">
                    <FaImage className="w-12 h-12 text-green-500/50" />
                    <span className="mt-2 text-gray-400">
                      Click to upload shop image
                    </span>
                  </label>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="shopImage"
                required
              />
              <label
                htmlFor="shopImage"
                className="block w-full px-4 py-2 text-sm text-center text-gray-300 bg-green-500/20 rounded-lg cursor-pointer hover:bg-green-500/30 transition-all"
              >
                {imageFile ? "Change Image" : "Select Image"}
              </label>
            </div>
          </div>

          {/* Submit Button */}
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
                  Creating Profile...
                </div>
              ) : (
                "Create Vendor Profile"
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
