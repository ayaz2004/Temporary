import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRecycle } from "react-icons/fa";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
              Join our mission for sustainable waste management and a cleaner
              environment
            </p>
          </div>

          {/* Form Section */}
          <div className="flex-1 w-full">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-green-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">
                Welcome Back
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label value="Email" className="text-gray-300" />
                  <TextInput
                    type="email"
                    placeholder="name@company.com"
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
                    placeholder="••••••••"
                    id="password"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value.trim(),
                      })
                    }
                  />
                </div>
                <Button
                  type="submit"
                  gradientDuoTone="greenToBlue"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Spinner size="sm" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                {/* <OAuth /> */}
              </form>

              <div className="mt-4 text-center">
                <span className="text-gray-400">New to WasteWise? </span>
                <Link
                  to="/sign-up"
                  className="text-green-500 hover:text-green-400"
                >
                  Create an account
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
