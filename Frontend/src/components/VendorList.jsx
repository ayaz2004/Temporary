import { FaStar, FaHeart } from "react-icons/fa";
import { Card, Button, Badge } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const VendorList = ({ vendors, favorites, toggleFavorite }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vendors.map((vendor) => (
        <Card
          key={vendor._id}
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
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(vendor._id);
              }}
            >
              <FaHeart
                className={
                  favorites.has(vendor._id) ? "text-red-500" : "text-gray-500"
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
            <div className="flex flex-wrap gap-2 mb-4">
              {vendor.wasteTypes?.map((type, index) => (
                <Badge key={index} color="info">
                  {type}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <Button gradientDuoTone="greenToBlue">Schedule Pickup</Button>
              <Button
                gradientDuoTone="cyanToBlue"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `tel:${vendor.phone}`;
                }}
              >
                Contact Now
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default VendorList;
