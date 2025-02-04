import { useState, useEffect } from "react";
import {
  Card,
  Button,
  TextInput,
  Badge,
  Dropdown,
  Spinner,
} from "flowbite-react";
import {
  FaSearch,
  FaRecycle,
  FaMoneyBillWave,
  FaWeightHanging,
  FaInfoCircle,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product/getAllProducts");
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (categoryFilter === "all" || product.category === categoryFilter) &&
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-teal-900 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="xl" className="mb-4" />
          <p className="text-white">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-teal-900 p-4">
      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-green-500/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              icon={FaSearch}
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <Dropdown label="Category Filter" className="w-full">
              <Dropdown.Item onClick={() => setCategoryFilter("all")}>
                All Categories
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setCategoryFilter("eWaste")}>
                E-Waste
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setCategoryFilter("Plastic")}>
                Plastic
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setCategoryFilter("Metal")}>
                Metal
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setCategoryFilter("Glass")}>
                Glass
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white">
          Available Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product._id}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gray-800 border-green-500/30"
              // imgSrc={
              //   product.images[0] || "https://via.placeholder.com/400x250"
              // }
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge
                    color="success"
                    className="flex items-center gap-2"
                    size="xl"
                  >
                    <MdCategory className="text-lg" />
                    {product.category}
                  </Badge>
                  <Badge color="warning" size="xl">
                    <FaMoneyBillWave className="mr-2" />₹{product.price}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaWeightHanging className="text-green-500" />
                    <span>Quantity: {product.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaInfoCircle className="text-green-500" />
                    <p className="line-clamp-2">{product.description}</p>
                  </div>
                </div>

                <div className="flex justify-between gap-4 mt-4">
                  <Button
                    gradientDuoTone="greenToBlue"
                    className="flex-1 transform transition hover:scale-105"
                  >
                    <FaRecycle className="mr-2" />
                    Contact Seller
                  </Button>
                  <Link to={`/product/${product._id}`} className="flex-1">
                    <Button
                      gradientDuoTone="cyanToBlue"
                      className="w-full transform transition hover:scale-105"
                    >
                      <FaInfoCircle className="mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center text-white py-8">
            <FaRecycle className="mx-auto text-6xl mb-4 text-green-500" />
            <p className="text-xl">No products found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
