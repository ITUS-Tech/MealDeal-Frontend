import { toast } from "react-toastify";
import { clearToken } from "../services/clearJwt";
import { getName } from "../services/customerService";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import TiffinVendorCard from "../screens/tiffinVendorCard";

import "../styles/homeScreen.css";

function CustomerHome(props) {
  const [name, setName] = useState("Guest");
  const [vegFilter, setVegFilter] = useState(false);
  const [sortBy, setSortBy] = useState("default"); // default, price, rating
  const { isLoggedIn, isCustomer, token, updateToken } = props.auth;
  const [tiffinVendors, setTiffinVendors] = useState([]);
  const [filteredTiffinVendors, setFilteredTiffinVendors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [sortOption, setSortOption] = useState("");

  const navigate = useNavigate();

  //Fetching the data from API
  useEffect(() => {
    const fetchPromise = fetch("http://mealdeal.herokuapp.com/vendor", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((res) => {
        setTiffinVendors(res);
        setFilteredTiffinVendors(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (isLoggedIn && !isCustomer) {
      clearToken(updateToken);
      return;
    }
    const name = getName(token);
    if (name) setName(name);
    else toast.error("invalid customer");
  }, [isLoggedIn, isCustomer, updateToken, token]);

  // Handle Price sorting
  const handleSortOption = (event) => {
    setSortOption(event.target.value);
  };

  const sortVendors = (vendors, sortOption) => {
    const sortedVendors = [...vendors];
    switch (sortOption) {
      case "desc":
        sortedVendors.sort((a, b) => {
          const aPrice = a.prices.Month || 0;
          const bPrice = b.prices.Month || 0;
          console.log("desc");
          return bPrice - aPrice;
        });
        break;
      case "asc":
        sortedVendors.sort((a, b) => {
          const aPrice = a.prices.Month || 0;
          const bPrice = b.prices.Month || 0;
          console.log("desc");
          return aPrice - bPrice;
        });
        break;
      default:
        break;
    }
    return sortedVendors;
  };

  const handleSearch = async (e) => {
    console.log(searchQuery);
  };

  return (
    <React.Fragment>
      <div className="container">
        <div id="background" className={!searched ? "bg-height" : ""}>
          <h4 className="greeting"> {`Hi ${name}`}</h4>
          <div className="input-group mb-3 ">
            <input
              type="text"
              className="form-control"
              placeholder="Search by city or pincode"
              value={searchQuery}
              onChange={(input) => setSearchQuery(input.target.value)}
            />
            <button
              className="btn btn-primary px-4"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {tiffinVendors.length !== 0 && (
          <div>
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                <select
                  className="form-select"
                  onChange={handleSortOption}
                  value={sortOption}
                >
                  <option value="">--Select Option--</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                <label className="switch">
                  <input
                    className=""
                    type="checkbox"
                    name="veg filter"
                    value={vegFilter}
                    checked={vegFilter}
                    onChange={() => setVegFilter(!vegFilter)}
                  />
                </label>
                <span className="p-3">Veg Only?</span>
              </div>
            </div>
            <div className="row mt-3">
              {tiffinVendors &&
                tiffinVendors.length > 0 &&
                sortVendors(tiffinVendors, sortOption)
                  .filter((value) => {
                    if (searchQuery === "" && !vegFilter) {
                      return true; // include all vendors if no search query or filter is selected
                    } else if (searchQuery !== "" && !vegFilter) {
                      return value.address
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()); // include vendors that match the search query
                    } else if (searchQuery === "" && vegFilter) {
                      return value.isVeg; // include vendors that are vegetarian
                    } else {
                      return (
                        value.address
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) && value.isVeg
                      ); // include vendors that match the search query and are vegetarian
                    }
                  })
                  .map((value) => (
                    <div className="col-lg-3 col-md-3 col-sm-12" key={value.id} onClick={() => navigate(`/vendor/${value.id}`)}>
                      <div className="tiffin-vendor-card card shadow-sm">
                        <div className="card--body">
                          <img
                            className="card-image"
                            src={value.image}
                            alt="Tiffin image"
                          />
                          <div className="card-content">
                            <h6 className="business-name">
                              {value.vendorName}
                            </h6>
                            <p className="mb-1">{value.address}</p>
                            <p>
                              Monthly price:{" "}
                              {value.prices.Month
                                ? `$${value.prices.Month}`
                                : "Not available"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default CustomerHome;
