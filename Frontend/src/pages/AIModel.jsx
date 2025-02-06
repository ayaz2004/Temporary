import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Spinner } from "flowbite-react";
import {
  FaCloudUploadAlt,
  FaRecycle,
  FaCheck,
  FaLeaf,
  FaTshirt,
  FaMicrochip,
  FaGlasses,
  FaQuestion,
  FaFileAlt,
} from "react-icons/fa";

const AIModel = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const getMaterialIcon = (type) => {
    const icons = {
      biodegradable: FaLeaf,
      clothes: FaTshirt,
      electronics: FaMicrochip,
      glasses: FaGlasses,
      null: FaQuestion,
      paper: FaFileAlt,
      plastic: FaRecycle,
    };
    return icons[type.toLowerCase()] || FaQuestion;
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleClassify = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const base64Image = await convertToBase64(image);
      const API_KEY = import.meta.env.VITE_ROBOFLOW_API_KEY;
      const MODEL_ENDPOINT = import.meta.env.VITE_MODEL_ENDPOINT;

      const response = await fetch(`${MODEL_ENDPOINT}?api_key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: base64Image,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Classification error:", error);
      // Add user-friendly error message
      setResult({ error: "Failed to classify image. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-teal-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Waste Classification
          </h1>
          <p className="text-gray-300 text-lg">
            Upload an image to classify waste materials using our advanced AI
            model
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-green-500/20">
          <div
            {...getRootProps()}
            className={`
            relative rounded-2xl border-2 border-dashed p-12 text-center
            transition-all cursor-pointer
            ${
              isDragActive
                ? "border-green-500 bg-green-500/10"
                : "border-gray-600 hover:border-green-500/50"
            }
          `}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              <FaCloudUploadAlt className="mx-auto text-6xl text-green-500 animate-bounce" />
              <p className="text-gray-300">
                {isDragActive
                  ? "Drop your image here..."
                  : "Drag & drop an image, or click to select"}
              </p>
            </div>
          </div>

          {preview && (
            <div className="mt-8">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="mt-4 flex justify-center">
                <Button
                  gradientDuoTone="greenToBlue"
                  size="xl"
                  onClick={handleClassify}
                  disabled={loading}
                  className="transform hover:scale-105 transition-all"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Spinner size="sm" />
                      <span>Classifying...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FaRecycle />
                      <span>Classify Waste</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-8 bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm animate-fadeIn">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaCheck className="text-green-500" />
                Classification Results
              </h3>

              {result.predictions?.map((prediction, index) => {
                const Icon = getMaterialIcon(prediction.class);
                const confidence = (prediction.confidence * 100).toFixed(1);

                return (
                  <div
                    key={prediction.detection_id}
                    className="bg-gray-800/50 rounded-lg p-6 mb-4 border border-green-500/20
                     transform hover:scale-102 transition-all duration-300"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-green-500/10">
                          <Icon className="text-3xl text-green-400" />
                        </div>
                        <h4 className="text-xl font-semibold text-white capitalize">
                          {prediction.class}
                        </h4>
                      </div>
                      <span className="text-2xl font-bold text-green-400">
                        {confidence}%
                      </span>
                    </div>

                    <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full rounded-full
                        bg-gradient-to-r from-green-500 to-teal-500
                        animate-expandWidth"
                        style={{
                          width: `${confidence}%`,
                          transition: "width 1s ease-out",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIModel;
