import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spinner, Card } from "flowbite-react";
import { FaArrowLeft, FaMoneyBillWave, FaWeightHanging } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Update API endpoint to match backend route
        const response = await fetch(`/api/product/getProduct/${productId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch product");
        }

        setProduct(data.product);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-teal-900 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-teal-900 p-8">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <Button color="gray" onClick={() => navigate(-1)} className="mt-4">
            <FaArrowLeft className="mr-2" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-teal-900 p-6">
      <div className="max-w-6xl mx-auto">
        <Button color="gray" onClick={() => navigate(-1)} className="mb-6">
          <FaArrowLeft className="mr-2" /> Back to Products
        </Button>

        <Card className="bg-gray-800 border-green-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-96 rounded-lg overflow-hidden border-2 border-green-500/30">
                <img
                  src={product?.images[currentImage]}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto py-2">
                {product?.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 
                      ${
                        currentImage === index
                          ? "border-green-500"
                          : "border-transparent"
                      }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="bg-green-500/20 text-green-500 px-4 py-2 rounded-full flex items-center">
                  <MdCategory className="mr-2" />
                  {product?.category}
                </span>
                <span className="bg-yellow-500/20 text-yellow-500 px-4 py-2 rounded-full flex items-center">
                  <FaMoneyBillWave className="mr-2" />₹{product?.price}
                </span>
              </div>

              <div className="space-y-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <FaWeightHanging className="text-green-500" />
                  <span>Quantity: {product?.quantity}</span>
                </div>
                <p className="text-sm leading-relaxed">
                  {product?.description}
                </p>
                <p className="text-xs">
                  Listed on: {new Date(product?.createdAt).toLocaleDateString()}
                </p>
              </div>

              <Button gradientDuoTone="greenToBlue" className="w-full mt-4">
                Contact Seller
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
