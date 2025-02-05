import { useState, useEffect } from "react";
import { FaStar, FaHeart, FaTruck } from "react-icons/fa";
import { Card, Button, Badge, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [wasteFilter, setWasteFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [favorites, setFavorites] = useState(new Set());
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch vendors from backend API
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("/api/vendor/getAllVendors");
        if (!response.ok) {
          throw new Error("Failed to fetch vendors");
        }
        const data = await response.json();
        setVendors(data.data || []); // Assuming response format from ApiResponse class
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filteredVendors = vendors
    .filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (wasteFilter === "all" || vendor.wasteTypes?.includes(wasteFilter))
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "distance")
        return parseFloat(a.distance) - parseFloat(b.distance);
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-teal-900 flex items-center justify-center">
        <Spinner size="xl" className="text-green-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-teal-900 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl">Error: {error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-teal-900">
      {/* Map Section */}
      <div className="h-[50vh] relative transition-all duration-500 bg-gray-800">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-green-500">
            <FaTruck className="w-8 h-8 text-green-500 animate-bounce" />
            <p className="mt-2 text-sm text-gray-300">
              Finding nearest waste collectors...
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        {/* ... existing search/filter UI ... */}
      </div>

      {/* Vendors Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-white">
          Available Waste Collectors ({filteredVendors.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <Card
              key={vendor._id} // Changed from id to _id to match MongoDB
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gray-800 border-green-500/30"
              imgSrc={vendor.image?.[0] || "/placeholder-image.jpg"}
              horizontal={false}
              onClick={() => navigate(`/vendor/${vendor._id}`)}
            >
              {vendor.featured && (
                <Badge color="success" className="absolute top-4 right-4">
                  Verified
                </Badge>
              )}
              <div className="relative">
                <Button
                  color={favorites.has(vendor._id) ? "failure" : "gray"}
                  className="absolute top-4 right-4 rounded-full p-2"
                  onClick={() => toggleFavorite(vendor._id)}
                >
                  <FaHeart
                    className={
                      favorites.has(vendor._id)
                        ? "text-red-500"
                        : "text-gray-500"
                    }
                  />
                </Button>
                <h5 className="text-xl font-bold tracking-tight text-white mb-2">
                  {vendor.name}
                </h5>
                <div className="flex items-center mb-2">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-bold text-white">{vendor.rating}</span>
                  <span className="text-gray-400 ml-1">
                    ({vendor.reviews} reviews)
                  </span>
                </div>
                {/* ... rest of the vendor card content ... */}
                <div className="mt-4 flex justify-between">
                  <Button gradientDuoTone="greenToBlue">Schedule Pickup</Button>
                  <Button
                    gradientDuoTone="cyanToBlue"
                    onClick={() =>
                      (window.location.href = `tel:${vendor.phone}`)
                    }
                  >
                    Contact Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
