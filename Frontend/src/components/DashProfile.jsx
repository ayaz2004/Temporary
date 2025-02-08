import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, TextInput, Select } from "flowbite-react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaMapMarkedAlt,
  FaEnvelope,
  FaPhone,
  FaCar,
  FaIdCard,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaStore,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFileUrl(file);
      setImageFile(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    console.log("Uploading image...");
  };

  const handleVendorRegistration = () => {
    navigate("/add-vendor");
  };

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
        workArea: currentUser.workArea,
        vehicleNumber: currentUser.vehicleNumber,
        adharNo: currentUser.adharNo,
        role: currentUser.role, // "admin" or "user"
      });
    }
  }, [currentUser]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hover: {
      x: 5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-b from-gray-900 via-green-900 to-teal-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full px-4 py-8"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 p-5">
          <div className="relative inline-block group">
            <label htmlFor="profileImage" className="cursor-pointer block">
              <img
                src={imageFileUrl || currentUser?.profilePicture}
                className="w-32 h-32 rounded-full border-4 border-green-500/30 shadow-lg shadow-green-500/20 transition-all duration-300 group-hover:border-green-400/50"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                  Change Photo
                </span>
              </div>
            </label>

            <input
              type="file"
              id="profileImage"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />

            {currentUser?.approvedUser && (
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                <FaCheckCircle className="text-white text-xl" />
              </div>
            )}
          </div>

          {imageFileUrl && (
            <div className="mt-2 flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setImageFile(null);
                  setImageFileUrl(null);
                }}
                className="text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                Remove photo
              </button>
            </div>
          )}
          <h1 className="mt-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
            {currentUser?.username}
          </h1>
          <p className="text-gray-400 mt-2">{currentUser?.email}</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
              <FaStar className="text-yellow-400" />
              <span className="text-green-400">
                {currentUser?.ratings || 0} Rating
              </span>
            </div>
            <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
              <FaCheckCircle className="text-green-400" />
              <span className="text-green-400">
                {currentUser?.completedRequests || 0} Completed
              </span>
            </div>
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.form variants={itemVariants} className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="col-span-2">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Basic Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Username Field */}
                  <div className="group">
                    <label className="text-gray-400 mb-2 block">Username</label>
                    <div className="relative">
                      <FaUserCircle className="absolute left-3 top-3 text-green-500" />
                      <TextInput
                        type="text"
                        value={formData.username || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="group">
                    <label className="text-gray-400 mb-2 block">Email</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-3 text-green-500" />
                      <TextInput
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Information */}
              <div className="col-span-2">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Work Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Work Area */}
                  <div className="group">
                    <label className="text-gray-400 mb-2 block">
                      Work Area
                    </label>
                    <div className="relative">
                      <FaMapMarkedAlt className="absolute left-3 top-3 text-green-500" />
                      <TextInput
                        type="text"
                        value={formData.workArea || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, workArea: e.target.value })
                        }
                        className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                      />
                    </div>
                  </div>

                  {/* Vehicle Number */}
                  <div className="group">
                    <label className="text-gray-400 mb-2 block">
                      Vehicle Number
                    </label>
                    <div className="relative">
                      <FaCar className="absolute left-3 top-3 text-green-500" />
                      <TextInput
                        type="text"
                        value={formData.vehicleNumber || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            vehicleNumber: e.target.value,
                          })
                        }
                        className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                      />
                    </div>
                  </div>

                  {/* Aadhar Number */}
                  <div className="group">
                    <label className="text-gray-400 mb-2 block">
                      Aadhar Number
                    </label>
                    <div className="relative">
                      <FaIdCard className="absolute left-3 top-3 text-green-500" />
                      <TextInput
                        type="text"
                        value={formData.adharNo || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, adharNo: e.target.value })
                        }
                        className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                      />
                    </div>
                  </div>

                  {/* Role Selection */}
                  <div className="group">
                    <label className="text-gray-400 mb-2 block">Role</label>
                    <Select
                      value={formData.role || "user"}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                    >
                      <option value="user">User</option>
                      <option value="vendor">Vendor</option>
                      {/* <option value="admin">Admin</option> */}
                    </Select>
                  </div>
                </div>
              </div>

              {/* Location Information
              <div className="col-span-2">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Location
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Latitude */}
              {/* 
                  <div className="group">
                    <label className="text-gray-400 mb-2 block">Latitude</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-3 text-green-500" />
                      <TextInput
                        type="number"
                        value={formData.coordinates?.latitude || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            coordinates: {
                              ...formData.coordinates,
                              latitude: parseFloat(e.target.value),
                            },
                          })
                        }
                        className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                      />
                    </div>
                  </div>

                  {/* Longitude */}
              {/*
                  <div className="group">
                    <label className="text-gray-400 mb-2 block">
                      Longitude
                    </label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-3 text-green-500" />
                      <TextInput
                        type="number"
                        value={formData.coordinates?.longitude || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            coordinates: {
                              ...formData.coordinates,
                              longitude: parseFloat(e.target.value),
                            },
                          })
                        }
                        className="pl-10 w-full bg-gray-900/50 border-gray-700 focus:border-green-500 text-gray-200"
                      />
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Submit Button */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col md:flex-row gap-4"
          >
            {/* Update Profile Button */}
            <Button
              type="submit"
              gradientDuoTone="greenToBlue"
              className="flex-1 py-3 font-semibold text-lg"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                  Updating...
                </div>
              ) : (
                "Update Profile"
              )}
            </Button>
            {/* Delete Profile Button */}
            <Button
              type="button"
              gradientDuoTone="redToYellow"
              className="flex-1 py-3 font-semibold text-lg"
              // onClick={handleDeleteProfile}
            >
              Delete Profile
            </Button>
          </motion.div>
        </motion.form>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-6 mt-8"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <FaCheckCircle className="text-2xl text-green-400" />
              </div>
              <div>
                <p className="text-gray-400">Completed Requests</p>
                <h4 className="text-2xl font-bold text-green-400">
                  {currentUser?.completedRequests || 0}
                </h4>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <FaTimesCircle className="text-2xl text-red-400" />
              </div>
              <div>
                <p className="text-gray-400">Cancelled Requests</p>
                <h4 className="text-2xl font-bold text-red-400">
                  {currentUser?.cancelledRequests || 0}
                </h4>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <FaStar className="text-2xl text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400">Average Rating</p>
                <h4 className="text-2xl font-bold text-yellow-400">
                  {currentUser?.ratings || 0}
                </h4>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add Vendor Registration Card if user role is vendor */}
        {currentUser?.role === "vendor" && (
          <motion.div variants={itemVariants} className="mb-8 py-3">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <FaStore className="text-2xl text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-400">
                      Vendor Registration
                    </h3>
                    <p className="text-gray-400">
                      Register your business details to start accepting waste
                      collection requests
                    </p>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleVendorRegistration}
                    gradientDuoTone="greenToBlue"
                    className="px-6 py-2"
                  >
                    Register as Vendor
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
