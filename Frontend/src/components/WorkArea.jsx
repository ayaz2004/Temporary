import { motion } from "framer-motion";
import { FaMapMarkedAlt, FaUsers, FaTruck, FaRecycle } from "react-icons/fa";

export default function WorkArea() {
  // Dummy data for work areas
  const workAreas = [
    {
      id: 1,
      area: "South Delhi",
      activeVendors: 12,
      collectionPoints: 8,
      wasteCollected: "2.5 tons",
      coordinates: { lat: 28.5244, lng: 77.1855 },
    },
    {
      id: 2,
      area: "North Delhi",
      activeVendors: 15,
      collectionPoints: 10,
      wasteCollected: "3.2 tons",
      coordinates: { lat: 28.7041, lng: 77.1025 },
    },
    {
      id: 3,
      area: "East Delhi",
      activeVendors: 8,
      collectionPoints: 6,
      wasteCollected: "1.8 tons",
      coordinates: { lat: 28.6279, lng: 77.2785 },
    },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen w-full p-6 bg-gradient-to-b from-gray-900 via-green-900 to-teal-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
            Work Areas
          </h1>
          <p className="text-gray-400 mt-2">
            Overview of waste collection areas and activities
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <FaMapMarkedAlt className="text-2xl text-green-400" />
              </div>
              <div>
                <p className="text-gray-400">Total Areas</p>
                <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                  {workAreas.length}
                </h4>
              </div>
            </div>
          </motion.div>

          {/* Add more stat cards */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <FaUsers className="text-2xl text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400">Active Vendors</p>
                <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  {workAreas.reduce((sum, area) => sum + area.activeVendors, 0)}
                </h4>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <FaTruck className="text-2xl text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400">Collection Points</p>
                <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {workAreas.reduce(
                    (sum, area) => sum + area.collectionPoints,
                    0
                  )}
                </h4>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-teal-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-500/20 rounded-lg">
                <FaRecycle className="text-2xl text-teal-400" />
              </div>
              <div>
                <p className="text-gray-400">Total Waste Collected</p>
                <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                  7.5 tons
                </h4>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Work Areas List */}
        <motion.div variants={itemVariants}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20">
            <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 mb-6">
              Active Work Areas
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workAreas.map((area) => (
                <motion.div
                  key={area.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-900/50 rounded-xl p-6 border border-green-500/10"
                >
                  <h3 className="text-xl font-semibold text-green-400 mb-4">
                    {area.area}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Active Vendors:</span>
                      <span className="text-green-400">
                        {area.activeVendors}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Collection Points:</span>
                      <span className="text-green-400">
                        {area.collectionPoints}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Waste Collected:</span>
                      <span className="text-green-400">
                        {area.wasteCollected}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Coordinates:</span>
                      <span className="text-green-400">
                        {area.coordinates.lat.toFixed(4)},{" "}
                        {area.coordinates.lng.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
