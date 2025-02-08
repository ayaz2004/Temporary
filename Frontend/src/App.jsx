import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";

import "leaflet/dist/leaflet.css";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import VendorDetails from "./pages/VendorDetails";
import FooterCom from "./components/Footer";
import AIModel from "./pages/AIModel";
import { useEffect,useState } from "react";


export default function App() {

  return (
    <>
      {/* Leaflet Map */}

      {/* React Router */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/vendor/:vendorId" element={<VendorDetails />} />
          <Route path="AIModel" element={<AIModel />} />
        </Routes>
        <FooterCom />
      </BrowserRouter>
    </>
  );
}
