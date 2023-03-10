import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./screens/protectedRoute";
import CustomerHome from "./screens/homeScreen";
import CustomerLogin from "./screens/customerLogin";
import CustomerRegister from "./screens/customerRegister";
import CustomerEditDetails from "./screens/customerEditDetails";
import TiffinVendorHome from "./screens/tiffinVendorHome";
import TiffinVendorLogin from "./screens/tiffinVendorLogin";
import TiffinVendorEditDetails from "./screens/tiffinVendorEditDetails";
import TiffinVendorDetails from "./screens/tiffinVendorDetails";
import NavBar from "./screens/navBar";
import TiffinVendorRegister from "./screens/tiffinVendorRegister";
import NotFound from "./screens/notFound";

import config from "./config.json";
import "./App.css";
import CustomerSubscriptions from "./screens/customerSubscriptions";
import TiffinVendorSubscriptions from "./screens/tiffinVendorSubscriptions";
import Cart from "./screens/Cart";
import ViewOrderHistory from "./screens/viewOrderHistory";
import ResetPassword from "./screens/resetPasswrod";

function App() {

  const [state, setState] = useState({userId:-1, isLoggedIn: false, isCustomer: true});

  const getUser = () => {
    let currState= {...state};
    let id= localStorage.getItem("userId")
    currState.userId= id || state.userId;
    currState.isLoggedIn= id>0;
    let iscustomer= localStorage.getItem("isCustomer")
    currState.isCustomer= iscustomer==='true'
    return currState
  };

  
  return (
    <React.Fragment>
      <NavBar user={getUser} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/customer" replace />} />
        <Route
          path="/customer"
          element={<CustomerHome/>}
        />
        <Route
          path="/customer/login"
          element={<CustomerLogin/>}
        />
        <Route
          path="/customer/register"
          element={<CustomerRegister/>}
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/resetPassword"
          element={<ResetPassword/>}
        />
        <Route
          path="/customer/edit"
          element={
            <ProtectedRoute
              auth={state}
              toNavigate="/customer/login"
              type="customer"
            >
              <CustomerEditDetails auth={state}/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/subscriptions"
          element={
            <ProtectedRoute
              auth={state}
              toNavigate={"/customer/login"}
              type="customer"
            >
              <CustomerSubscriptions auth={state} />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path={`
          /vendor/`}
          element={<TiffinVendorDetails auth={state} />
        }
        /> */}

        <Route
          path={"/vendor/:id"}
          element={<TiffinVendorDetails auth={state} />}
        />

        <Route
          path="/tiffin-vendor"
          element={
            <ProtectedRoute
              auth={state}
              toNavigate="/tiffin-vendor/login"
              type="tiffin-vendor"
            >
              <TiffinVendorHome auth={state} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tiffin-vendor/login"
          element={<TiffinVendorLogin />}
        />
        {/* <Route
          path="/tiffin-vendor/register"
          element={<TiffinVendorRegister updateToken={handleToken} />}
        /> */}
        <Route
          path="/tiffin-vendor/edit"
          element={
            <ProtectedRoute
              auth={state}
              toNavigate="/tiffin-vendor/login"
              type="tiffin-vendor"
            >
              <TiffinVendorEditDetails/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tiffin-vendor/subscriptions"
          element={
            <ProtectedRoute
              auth={state}
              toNavigate={"/tiffin-vendor/login"}
              type="tiffin-vendor"
            >
              <TiffinVendorSubscriptions auth={state} />
            </ProtectedRoute>
          }
        />

        <Route path="/order-history" element={<ViewOrderHistory />} />
<Route
          path={"/vendorHome"}
          element={<TiffinVendorHome auth={state} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
