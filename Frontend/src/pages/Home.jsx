import { useState,useEffect } from "react";
import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaSearch,
  FaRecycle,
  FaHeart,
  FaTruck,
} from "react-icons/fa";
import { MdEco } from "react-icons/md";
import { Card, Button, TextInput, Badge, Dropdown } from "flowbite-react";
import "leaflet/dist/leaflet.css";
import {
  Marker,
  Popup,
  TileLayer,
  MapContainer,
  Polyline,
} from "react-leaflet";
import { icon } from "leaflet";
import { coordinatesAndTimeStamp } from "../coordinateResponse/reponse";

const customIcon = icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


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
       console.log(data)
        setCoordinates(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCoordinates();
  }, []);
  const vendors = [
    {
      id: 1,
      name: "EcoClean Solutions",
      rating: 4.8,
      reviews: 235,
      distance: "0.3 miles",
      availableTime: "6:00 AM - 8:00 PM",
      phone: "(555) 123-4567",
      image: "/api/placeholder/400/250",
      specialization: "General & Recyclable",
      price: "$$",
      responseTime: "Within 2 hours",
      certifications: ["Green Certified", "EPA Approved"],
      wasteTypes: ["Household", "Recyclables", "Green Waste"],
      featured: true,
    },
    {
      id: 2,
      name: "GreenBin Collectors",
      rating: 4.6,
      reviews: 180,
      distance: "0.5 miles",
      availableTime: "5:00 AM - 6:00 PM",
      phone: "(555) 234-5678",
      image: "/api/placeholder/400/250",
      specialization: "Organic Waste",
      price: "$",
      responseTime: "Same Day",
      certifications: ["Organic Certified"],
      wasteTypes: ["Food Waste", "Garden Waste"],
      featured: false,
    },
    {
      id: 3,
      name: "Industrial Waste Pros",
      rating: 4.9,
      reviews: 342,
      distance: "0.7 miles",
      availableTime: "24/7 Available",
      phone: "(555) 345-6789",
      image: "/api/placeholder/400/250",
      specialization: "Industrial",
      price: "$$$",
      responseTime: "Emergency Response",
      certifications: ["HAZMAT Certified", "ISO Certified"],
      wasteTypes: ["Industrial", "Chemical", "Construction"],
      featured: true,
    },
  ];

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
        (wasteFilter === "all" || vendor.wasteTypes.includes(wasteFilter))
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
    ? [parseFloat(coordinates[0].latitude), parseFloat(coordinates[0].longitude)]
    : [28.563878, 77.167651];

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
              weight={5}
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
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8 border border-green-500/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput
              icon={FaSearch}
              placeholder="Search waste collectors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <Dropdown label="Waste Type" className="w-full">
              <Dropdown.Item onClick={() => setWasteFilter("all")}>
                All Types
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setWasteFilter("Household")}>
                Household
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setWasteFilter("Recyclables")}>
                Recyclables
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setWasteFilter("Industrial")}>
                Industrial
              </Dropdown.Item>
            </Dropdown>
            <Dropdown label="Sort By" className="w-full">
              <Dropdown.Item onClick={() => setSortBy("rating")}>
                Rating
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("distance")}>
                Distance
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Vendors Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-white">
          Available Waste Collectors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <Card
              key={vendor.id}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gray-800 border-green-500/30"
              imgSrc={vendor.image}
              horizontal={false}>
              {vendor.featured && (
                <Badge color="success" className="absolute top-4 right-4">
                  Verified
                </Badge>
              )}
              <div className="relative">
                <Button
                  color={favorites.has(vendor.id) ? "failure" : "gray"}
                  className="absolute top-4 right-4 rounded-full p-2"
                  onClick={() => toggleFavorite(vendor.id)}>
                  <FaHeart
                    className={
                      favorites.has(vendor.id)
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
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-green-500" />
                    <span>{vendor.distance}</span>
                    <Badge color="success" className="ml-2">
                      {vendor.specialization}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-green-500" />
                    <span>{vendor.availableTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTruck className="text-green-500" />
                    <span>{vendor.responseTime}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h6 className="text-sm font-semibold text-green-400 mb-2">
                    Waste Types:
                  </h6>
                  <div className="flex flex-wrap gap-2">
                    {vendor.wasteTypes.map((type, index) => (
                      <Badge
                        key={index}
                        color="success"
                        className="bg-opacity-50">
                        <FaRecycle className="mr-1" />
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h6 className="text-sm font-semibold text-green-400 mb-2">
                    Certifications:
                  </h6>
                  <div className="flex flex-wrap gap-2">
                    {vendor.certifications.map((cert, index) => (
                      <Badge key={index} color="gray">
                        <MdEco className="mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button gradientDuoTone="greenToBlue">Schedule Pickup</Button>
                  <Button gradientDuoTone="cyanToBlue">Contact Now</Button>
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
