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

function App() {
  const defaultState = {
    isLoggedIn: false,
    isCustomer: true,
    token: null,
  };

  const getInitialState = () => {
    let localStorageState = localStorage.getItem(config.localStorageKey);
    if (localStorageState) localStorageState = JSON.parse(localStorageState);
    const initialState = localStorageState || defaultState;
    return initialState;
  };

  const [state, setState] = useState({ ...getInitialState() });

  const handleToken = (token, isCustomer) => {
    if (token === null) {
      setState({ ...getInitialState() });
      return;
    }
    const currState = { ...state };
    currState.isLoggedIn = true;
    currState.isCustomer = isCustomer;
    currState.token = token;
    localStorage.setItem(config.localStorageKey, JSON.stringify(currState));
    setState(currState);
  };
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <React.Fragment>
      <NavBar auth={state} updateToken={handleToken} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/customer" replace />} />
        <Route
          path="/customer"
          element={<CustomerHome auth={state} updateToken={handleToken} />}
        />
        <Route
          path="/customer/login"
          element={<CustomerLogin updateToken={handleToken} />}
        />
        <Route
          path="/customer/register"
          element={<CustomerRegister updateToken={handleToken} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/customer/edit"
          element={
            <ProtectedRoute
              auth={state}
              toNavigate="/customer/login"
              type="customer"
            >
              <CustomerEditDetails auth={state} updateToken={handleToken} />
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
          element={<TiffinVendorLogin updateToken={handleToken} />}
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
              <TiffinVendorEditDetails auth={state} updateToken={handleToken} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
