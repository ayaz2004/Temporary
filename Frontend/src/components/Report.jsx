import { motion } from "framer-motion";
import {
  FaChartBar,
  FaRecycle,
  FaUserFriends,
  FaMapMarkedAlt,
  FaDownload,
  FaFileAlt,
} from "react-icons/fa";
import { Button } from "flowbite-react";

export default function Report() {
  // Dummy data for reports
  const reports = {
    totalCollections: 156,
    totalWaste: "12.5 tons",
    activeVendors: 25,
    coverageAreas: 8,
    monthlyStats: [
      { month: "January", collections: 45, waste: "3.2 tons" },
      { month: "February", collections: 52, waste: "4.1 tons" },
      { month: "March", collections: 59, waste: "5.2 tons" },
    ],
  };

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
            Waste Collection Reports
          </h1>
          <p className="text-gray-400 mt-2">
            Overview of waste collection statistics and analytics
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-4 gap-6"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <FaChartBar className="text-2xl text-green-400" />
              </div>
              <div>
                <p className="text-gray-400">Total Collections</p>
                <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                  {reports.totalCollections}
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
                <p className="text-gray-400">Total Waste</p>
                <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                  {reports.totalWaste}
                </h4>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <FaUserFriends className="text-2xl text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400">Active Vendors</p>
                <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  {reports.activeVendors}
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
                <FaMapMarkedAlt className="text-2xl text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400">Coverage Areas</p>
                <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {reports.coverageAreas}
                </h4>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Monthly Report Table */}
        <motion.div variants={itemVariants}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                Monthly Reports
              </h2>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button gradientDuoTone="greenToBlue" size="sm">
                  <FaDownload className="mr-2" />
                  Export Report
                </Button>
              </motion.div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-green-500/20">
                    <th className="text-left py-3 px-4 text-gray-400">Month</th>
                    <th className="text-left py-3 px-4 text-gray-400">
                      Collections
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400">
                      Waste Collected
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400">
                      Report
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-500/10">
                  {reports.monthlyStats.map((stat, index) => (
                    <motion.tr
                      key={stat.month}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-gray-700/30"
                    >
                      <td className="py-3 px-4 text-gray-300">{stat.month}</td>
                      <td className="py-3 px-4 text-gray-300">
                        {stat.collections}
                      </td>
                      <td className="py-3 px-4 text-gray-300">{stat.waste}</td>
                      <td className="py-3 px-4">
                        <Button
                          gradientDuoTone="greenToBlue"
                          size="xs"
                          className="flex items-center gap-2"
                        >
                          <FaFileAlt />
                          View
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
