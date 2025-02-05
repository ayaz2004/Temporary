import { useState, useEffect } from "react";
import { Button, Spinner } from "flowbite-react";
import VendorList from "../components/VendorList";
import { TileLayer, MapContainer, Polyline } from "react-leaflet";
import { icon } from "leaflet";
import { coordinatesAndTimeStamp } from "../coordinateResponse/reponse";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [wasteFilter, setWasteFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [favorites, setFavorites] = useState(new Set());
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const data = await coordinatesAndTimeStamp();

        setCoordinates(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, []);
  const [vendors, setVendors] = useState([]);

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

  const routeCoordinates = coordinates.map((coord) => [
    parseFloat(coord.latitude),
    parseFloat(coord.longitude),
  ]);
  const defaultCenter = coordinates[0]
    ? [
        parseFloat(coordinates[0].latitude),
        parseFloat(coordinates[0].longitude),
      ]
    : [28.563878, 77.167651];

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
      {/* <div className="h-[50vh] relative transition-all duration-500 bg-gray-800">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-green-500">
            <FaTruck className="w-8 h-8 text-green-500 animate-bounce" />
            <p className="mt-2 text-sm text-gray-300">
              Finding nearest waste collectors...
            </p>
          </div>
        </div>
      </div> */}

      {/* <div className="h-[400px] w-full mb-8 rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={defaultCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {vendors.map((vendor) => (
            <Marker
              key={vendor.id}
              position={defaultCenter} // Replace with actual vendor coordinates
              icon={customIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{vendor.name}</h3>
                  <p>{vendor.specialization}</p>
                  <p>⭐ {vendor.rating}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div> */}
      {/* Map Section */}
      <div className="h-[400px] w-full mb-8 rounded-lg overflow-hidden shadow-lg">
        {loading ? (
          <div className="h-full flex items-center justify-center bg-gray-800">
            <p className="text-white">Loading map data...</p>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center bg-gray-800">
            <p className="text-red-500">Error: {error}</p>
          </div>
        ) : (
          <MapContainer
            center={defaultCenter}
            zoom={16}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            <Polyline
              positions={routeCoordinates}
              color="red"
              weight={6}
              opacity={0.9}
            />

            {/* {coordinates.map((coord, index) => (
              <Marker
                key={index}
                position={[
                  parseFloat(coord.latitude),
                  parseFloat(coord.longitude),
                ]}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold">Point {index + 1}</h3>
                    <p>Time: {coord.stamp}</p>
                  </div>
                </Popup>
              </Marker>
            ))} */}
          </MapContainer>
        )}
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
        <VendorList
          vendors={filteredVendors}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </div>
    </div>
  );
};

export default Home;
