import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CustomerHome from "./screens/homeScreen";
import CustomerLogin from "./screens/customerLogin";
import CustomerRegister from "./screens/customerRegister";
import TiffinVendorHome from "./screens/tiffinVendorHome";
import TiffinVendorLogin from "./screens/tiffinVendorLogin";
import TiffinVendorDetails from "./screens/tiffinVendorDetails";
import CustomerProfile from "./screens/customerProfile";
import EditCustomerProfile from "./screens/editCustomerProfile";
import ForgotPassword from "./screens/forgotPassword";
import NavBar from "./screens/navBar";
import NotFound from "./screens/notFound";
import CheckOTP from "./screens/checkOTP";
import "./App.css";
import Cart from "./screens/Cart";
import ViewOrderHistory from "./screens/viewOrderHistory";
import PaymentForm from "./screens/paymentPage";
import ConfirmPage from "./screens/confirmationPage";
import ResetPassword from "./screens/resetPassword";

function App() {
  useEffect(() => {
    document.title = 'Meal Deal';
  }, []);

  const [state, setState] = useState({
    userId: -1,
    isLoggedIn: false,
    isCustomer: true,
  });

  const getUser = () => {
    let currState = { ...state };
    let id = localStorage.getItem("userId");
    currState.userId = id || state.userId;
    currState.isLoggedIn = id > 0;
    let iscustomer = localStorage.getItem("isCustomer");
    currState.isCustomer = iscustomer === "true";
    return currState;
  };

  return (
    <React.Fragment>
      <NavBar user={getUser} />
      {/* <ToastContainer /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/customer" replace />} />
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/cart" element={<Cart user={getUser} />} />
        <Route path="/resetPassword" element={<ForgotPassword />} />
        <Route path={"/vendor/:id"} element={<TiffinVendorDetails user={getUser} />} />
        <Route path="/tiffin-vendor/login" element={<TiffinVendorLogin />} />
        <Route path="/order-history" element={<ViewOrderHistory />} />
        <Route path={"/vendorHome"} element={<TiffinVendorHome user={getUser} />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<CustomerProfile user={getUser} />} />
        <Route path="/editprofile" element={<EditCustomerProfile user={getUser} />} />
        <Route path="/payment/:id" element={<PaymentForm />} />
        <Route path="/confirm/:id" element={<ConfirmPage />} />
        <Route path="/checkotp" element={<CheckOTP/>} />  
        <Route path="/reset" element={<ResetPassword/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
