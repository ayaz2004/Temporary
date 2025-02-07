import {
  Alert,
  Button,
  Label,
  Spinner,
  TextInput,
  Select,
} from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRecycle } from "react-icons/fa";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-teal-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Branding Section */}
          <div className="flex-1 text-center md:text-left">
            <Link to="/" className="inline-flex items-center gap-2">
              <FaRecycle className="text-5xl text-green-500" />
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                WasteWise
              </span>
            </Link>
            <p className="mt-4 text-gray-300 text-lg">
              Join our community of eco-conscious individuals and waste
              management professionals
            </p>
          </div>

          {/* Form Section */}
          <div className="flex-1 w-full">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-green-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">
                Create Account
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label value="Username" className="text-gray-300" />
                  <TextInput
                    type="text"
                    id="username"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        username: e.target.value.trim(),
                      })
                    }
                  />
                </div>
                <div>
                  <Label value="Email" className="text-gray-300" />
                  <TextInput
                    type="email"
                    id="email"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value.trim() })
                    }
                  />
                </div>
                <div>
                  <Label value="Password" className="text-gray-300" />
                  <TextInput
                    type="password"
                    id="password"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value.trim(),
                      })
                    }
                  />
                </div>
                <div>
                  <Label value="Role" className="text-gray-300" />
                  <Select
                    id="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    <option value="user">User</option>
                    <option value="vendor">Vendor</option>
                  </Select>
                </div>

                {formData.role === "vendor" && (
                  <>
                    <div>
                      <Label value="Work Area" className="text-gray-300" />
                      <TextInput
                        type="text"
                        id="workArea"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            workArea: e.target.value.trim(),
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label value="Vehicle Number" className="text-gray-300" />
                      <TextInput
                        type="text"
                        id="vehicleNumber"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            vehicleNumber: e.target.value.trim(),
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label value="Aadhar Number" className="text-gray-300" />
                      <TextInput
                        type="text"
                        id="adharNo"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            adharNo: e.target.value.trim(),
                          })
                        }
                      />
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  gradientDuoTone="greenToBlue"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Spinner size="sm" />
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
                {/* <OAuth /> */}
              </form>

              <div className="mt-4 text-center">
                <span className="text-gray-400">Already have an account? </span>
                <Link
                  to="/sign-in"
                  className="text-green-500 hover:text-green-400"
                >
                  Sign In
                </Link>
              </div>

              {errorMessage && (
                <Alert className="mt-5" color="failure">
                  {errorMessage}
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
