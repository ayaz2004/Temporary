import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import WasteManagementUI from "./pages/WasteManagementUI";
import UserDashboard from "./pages/UserDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
 import VendorVerification from "./pages/Verify";
 import UserProtectedRoute from "./components/UserProtectedRoute"; 
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> 
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route element={<UserProtectedRoute />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
        {/* <Route element={<ProtectedRoute />}>
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        </Route> */}

        {/* <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} /> */}
        {/* <Route path="/verification" element={<VendorVerification />} /> */}
        {/* <Route path="/" element={<WasteManagementUI />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
