import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaTruck,
  FaPhone,
  FaCertificate,
  FaClock,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaEnvelope,
  FaRecycle,
  FaIndustry,
  FaWeightHanging,
  FaShieldAlt,
  FaCheckCircle,
  FaCarSide,
} from "react-icons/fa";
import { Button, Spinner, Badge, Alert, Card } from "flowbite-react";

export default function VendorDetails() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await fetch(`/api/vendor/getVendor/${vendorId}`);
        if (!response.ok) throw new Error("Failed to fetch vendor details");
        const data = await response.json();
        setVendor(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorDetails();
  }, [vendorId]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} onBack={() => navigate(-1)} />;
  if (!vendor)
    return <ErrorScreen error="Vendor not found" onBack={() => navigate(-1)} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-teal-900">
      {/* Hero Section */}
      <div className="relative h-[50vh]">
        <img
          src={vendor.image?.[0] || "/placeholder-image.jpg"}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-end pb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {vendor.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-white font-bold">{vendor.rating}</span>
                  <span className="text-gray-300 ml-1">
                    ({vendor.reviews} reviews)
                  </span>
                </div>
                {vendor.featured && (
                  <Badge color="success">Verified Vendor</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="bg-gray-800 border-green-500/30">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Button gradientDuoTone="greenToBlue" className="w-full">
                Schedule Pickup
              </Button>
              <Button
                gradientDuoTone="cyanToBlue"
                className="w-full"
                onClick={() => (window.location.href = `tel:${vendor.phone}`)}
              >
                Contact Now
              </Button>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gray-800 border-green-500/30">
            <h2 className="text-xl font-bold text-white mb-4">
              Contact Details
            </h2>
            <div className="space-y-3">
              <InfoItem icon={FaPhone} label="Phone" value={vendor.phone} />
              <InfoItem icon={FaEnvelope} label="Email" value={vendor.email} />
              <InfoItem
                icon={FaMapMarkerAlt}
                label="Address"
                value={vendor.address}
              />
            </div>
          </Card>

          {/* Business Details */}
          <Card className="bg-gray-800 border-green-500/30">
            <h2 className="text-xl font-bold text-white mb-4">Business Info</h2>
            <div className="space-y-3">
              <InfoItem
                icon={FaIndustry}
                label="License"
                value={vendor.businessLicense}
              />
              <InfoItem
                icon={FaClock}
                label="Since"
                value={vendor.establishedYear}
              />
              <InfoItem
                icon={FaTruck}
                label="Completed Pickups"
                value={vendor.completedPickups}
              />
            </div>
          </Card>
        </div>

        {/* Services & Waste Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="bg-gray-800 border-green-500/30">
            <h2 className="text-xl font-bold text-white mb-4">Services</h2>
            <div className="space-y-4">
              <InfoItem
                icon={FaClock}
                label="Available Time"
                value={vendor.availableTime}
              />
              <InfoItem
                icon={FaTruck}
                label="Response Time"
                value={vendor.responseTime}
              />
              <InfoItem
                icon={FaWeightHanging}
                label="Weight Limits"
                value={`${vendor.minimumWeight || "N/A"} - ${
                  vendor.maximumWeight || "N/A"
                } kg`}
              />
              <div className="mt-4">
                <h3 className="text-white font-semibold mb-2">
                  Services Offered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.servicesOffered?.map((service, index) => (
                    <Badge key={index} color="info">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-green-500/30">
            <h2 className="text-xl font-bold text-white mb-4">
              Waste Management
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Waste Types</h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.wasteTypes?.map((type, index) => (
                    <Badge key={index} color="success">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Operating Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.operatingAreas?.map((area, index) => (
                    <Badge key={index} color="purple">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className="bg-gray-800 border-green-500/30">
            <h2 className="text-xl font-bold text-white mb-4">
              Certifications
            </h2>
            <div className="flex flex-wrap gap-2">
              {vendor.certifications?.map((cert, index) => (
                <Badge key={index} color="warning">
                  {cert}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="bg-gray-800 border-green-500/30">
            <h2 className="text-xl font-bold text-white mb-4">Equipment</h2>
            <div className="space-y-3">
              <InfoItem
                icon={FaCarSide}
                label="Vehicles"
                value={vendor.vehicleTypes?.join(", ")}
              />
              <InfoItem
                icon={FaIndustry}
                label="Processing Capacity"
                value={vendor.processingCapacity}
              />
            </div>
          </Card>

          <Card className="bg-gray-800 border-green-500/30">
            <h2 className="text-xl font-bold text-white mb-4">Compliance</h2>
            <div className="space-y-3">
              <InfoItem
                icon={FaShieldAlt}
                label="Environmental Compliance"
                value={vendor.environmentalCompliance ? "Yes" : "No"}
              />
              <div className="mt-2">
                <h3 className="text-white font-semibold mb-2">
                  Safety Standards
                </h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.safetyStandards?.map((standard, index) => (
                    <Badge key={index} color="gray">
                      {standard}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper Components
const LoadingScreen = () => (
  <div
    className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-teal-900 
                  flex items-center justify-center"
  >
    <Spinner size="xl" className="text-green-500" />
  </div>
);

const ErrorScreen = ({ error, onBack }) => (
  <div
    className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-teal-900 
                  flex items-center justify-center"
  >
    <div className="text-center">
      <Alert color="failure">{error}</Alert>
      <Button onClick={onBack} className="mt-4">
        Go Back
      </Button>
    </div>
  </div>
);

const BackButton = ({ onClick }) => (
  <Button
    color="gray"
    className="absolute top-4 left-4 z-10 rounded-full p-2"
    onClick={onClick}
  >
    <FaArrowLeft className="text-white" />
  </Button>
);

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center">
    {Icon && <Icon className="text-green-500 mr-3 w-5 h-5" />}
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-white">{value || "N/A"}</p>
    </div>
  </div>
);
