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
} from "react-icons/fa";

export default function AddVendor() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const res = await fetch("/api/vendor/addVendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
                  Business Name
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
                <label className="text-gray-400 mb-2 block">Phone Number</label>
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
                  Business Address
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
                  Operating Hours
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
                  Response Time
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
                <label className="text-gray-400 mb-2 block">Price Range</label>
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
                <label className="text-gray-400 mb-2 block">Waste Types</label>
                <Select
                  multiple
                  value={formData.wasteTypes}
                  onChange={(e) => {
                    const options = [...e.target.selectedOptions];
                    setFormData({
                      ...formData,
                      wasteTypes: options.map((option) => option.value),
                    });
                  }}
                  className="w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                  required
                >
                  <option value="eWaste">E-Waste</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Metal">Metal</option>
                  <option value="Glass">Glass</option>
                </Select>
              </div>

              {/* Specialization */}
              <div className="group">
                <label className="text-gray-400 mb-2 block">
                  Specialization
                </label>
                <div className="relative">
                  <FaRecycle className="absolute left-3 top-3 text-green-500" />
                  <TextInput
                    type="text"
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      })
                    }
                    className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                  />
                </div>
              </div>

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
                  Operating Areas
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
                  />
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
