import { useState } from 'react';
import { Table, Badge, Button, TextInput, Select } from 'flowbite-react';
import { FaTrash, FaRecycle, FaLeaf, FaSearch, FaFileExport, FaFilter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const dummyWasteData = [
  {
    id: 1,
    date: '2024-02-09',
    type: 'Plastic',
    quantity: '50kg',
    status: 'Collected',
    location: 'Sector 62, Noida',
    customer: 'John Doe',
    payment: 500,
  },
  {
    id: 2,
    date: '2024-02-08',
    type: 'Paper',
    quantity: '30kg',
    status: 'Pending',
    location: 'Sector 18, Noida',
    customer: 'Jane Smith',
    payment: 300,
  },
  {
    id: 3,
    date: '2024-02-07',
    type: 'Electronic',
    quantity: '20kg',
    status: 'Processing',
    location: 'Sector 15, Noida',
    customer: 'Mike Johnson',
    payment: 1000,
  }
];

export default function WasteCollection() {
  const [collections, setCollections] = useState(dummyWasteData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const getStatusBadge = (status) => {
    const statusStyles = {
      Collected: { color: 'success', icon: FaRecycle },
      Pending: { color: 'warning', icon: FaTrash },
      Processing: { color: 'info', icon: FaLeaf }
    };

    const StatusIcon = statusStyles[status]?.icon;

    return (
      <Badge color={statusStyles[status]?.color} className="flex items-center gap-1">
        {StatusIcon && <StatusIcon className="w-3 h-3" />}
        {status}
      </Badge>
    );
  };
  

  const filteredCollections = collections.filter(collection => {
    const matchesSearch = 
      collection.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || collection.status === statusFilter;
    const matchesType = typeFilter === 'all' || collection.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-900 via-green-900 to-teal-900 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
            Waste Collections
          </h1>
          <p className="text-gray-400 mt-2">
            Track and manage your waste collection records
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20"
          >
            <h3 className="text-gray-400 mb-2">Total Collections</h3>
            <p className="text-3xl font-bold text-white">{filteredCollections.length}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20"
          >
            <h3 className="text-gray-400 mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-400">
              {collections.filter(c => c.status === 'Pending').length}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20"
          >
            <h3 className="text-gray-400 mb-2">Collected</h3>
            <p className="text-3xl font-bold text-green-400">
              {collections.filter(c => c.status === 'Collected').length}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20"
          >
            <h3 className="text-gray-400 mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-teal-400">
              ₹{collections.reduce((sum, item) => sum + item.payment, 0)}
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4 w-full">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-3 text-green-500" />
                <TextInput
                  type="text"
                  placeholder="Search by customer or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full bg-gray-900/50"
                />
              </div>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-gray-900/50"
              >
                <option value="all">All Status</option>
                <option value="Collected">Collected</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
              </Select>
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-gray-900/50"
              >
                <option value="all">All Types</option>
                <option value="Plastic">Plastic</option>
                <option value="Paper">Paper</option>
                <option value="Electronic">Electronic</option>
              </Select>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button gradientDuoTone="greenToBlue">
                <FaFileExport className="mr-2" />
                Export Report
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
          <div className="overflow-x-auto">
  <Table className="w-full">
    <Table.Head>
      <Table.HeadCell className="bg-gray-900/50 text-gray-400 font-semibold border-b border-green-500/20">
        Date
      </Table.HeadCell>
      <Table.HeadCell className="bg-gray-900/50 text-gray-400 font-semibold border-b border-green-500/20">
        Type
      </Table.HeadCell>
      <Table.HeadCell className="bg-gray-900/50 text-gray-400 font-semibold border-b border-green-500/20">
        Quantity
      </Table.HeadCell>
      <Table.HeadCell className="bg-gray-900/50 text-gray-400 font-semibold border-b border-green-500/20">
        Status
      </Table.HeadCell>
      <Table.HeadCell className="bg-gray-900/50 text-gray-400 font-semibold border-b border-green-500/20">
        Location
      </Table.HeadCell>
      <Table.HeadCell className="bg-gray-900/50 text-gray-400 font-semibold border-b border-green-500/20">
        Customer
      </Table.HeadCell>
      <Table.HeadCell className="bg-gray-900/50 text-gray-400 font-semibold border-b border-green-500/20">
        Payment (₹)
      </Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y divide-green-500/10">
      {filteredCollections.map((collection) => (
        <Table.Row 
          key={collection.id}
          className="bg-gray-800/30 hover:bg-gray-700/50 transition-all duration-200"
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-300 px-6 py-4">
            {new Date(collection.date).toLocaleDateString()}
          </Table.Cell>
          <Table.Cell className="text-gray-300 px-6 py-4">
            {collection.type}
          </Table.Cell>
          <Table.Cell className="text-gray-300 px-6 py-4">
            {collection.quantity}
          </Table.Cell>
          <Table.Cell className="px-6 py-4">
            {getStatusBadge(collection.status)}
          </Table.Cell>
          <Table.Cell className="text-gray-300 px-6 py-4">
            {collection.location}
          </Table.Cell>
          <Table.Cell className="text-gray-300 px-6 py-4">
            {collection.customer}
          </Table.Cell>
          <Table.Cell className="text-gray-300 px-6 py-4">
            ₹{collection.payment.toLocaleString()}
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</div>

          <div className="mt-4 flex justify-between items-center text-gray-400 text-sm">
            <p>Showing {filteredCollections.length} of {collections.length} collections</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}