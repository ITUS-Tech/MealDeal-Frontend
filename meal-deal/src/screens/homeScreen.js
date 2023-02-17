
import { toast } from "react-toastify";
import { clearToken } from "../services/clearJwt";
import { getName } from "../services/customerService";
import { getTiffinVendors } from "../services/vendorService";
import TiffinVendorCard from "../screens/tiffinVendorCard";
import TiffinVendorDetails from "../screens/tiffinVendorDetails";
import React, { useEffect, useState } from "react";
import { Component } from "react";
import "../styles/homeScreen.css";
import { isArray } from "lodash";


function CustomerHome(props) {
  const [name, setName] = useState("Guest");
  // const [query, setQuery] = useState(
  //   sessionStorage.getItem("tiffin_wale_search") || ""
  // );
  
  
  const [vegFilter, setVegFilter] = useState(false);
  const [sortBy, setSortBy] = useState("default"); // default, price, rating
  const { isLoggedIn, isCustomer, token, updateToken } = props.auth;
  const [tiffinVendors, setTiffinVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTiffinVendors, setFilteredTiffinVendors] = useState([]);
  const [searched, setSearched] = useState(false);

  //Fetching the data from API
  useEffect(() => {
    const fetchPromise = fetch("http://localhost:8080/vendor/", {    
      method: 'GET',    
      headers: { 'Content-Type' : 'application/json'},      
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

  useEffect(()=>{
    // if (query.length > 50){ 
    //   console.log("query length")
    //   return 
    // };
    const res = getTiffinVendors();
    if (res === null){
      console.log("null");
      return;
    }   
    else {
      // console.log(res);
      // sessionStorage.setItem("tiffin_wale_search");
      setTiffinVendors(res);
      // setSearched(true);
    }
    //  else toast.error("invalid city or pincode");
  }, [])

  const handleSearch = async (event) => {
    // if (searchQuery.length > 50) return;
    // const res = await getTiffinVendors(query);
    // if (res === null) return;
    // if (isArray(res)) {
    //   sessionStorage.setItem("tiffin_wale_search", query);
    //   setTiffinVendors(res);
    //   setSearched(true);
    // } else toast.error("invalid city or pincode");
      if (searchQuery.length > 50) return;
      const res = await getTiffinVendors(searchQuery);
      if (res === null) return;
      if (Array.isArray(res)) {
        sessionStorage.setItem("tiffin_wale_search", searchQuery);
        setFilteredTiffinVendors(res);
        setSearched(true);
      } else {
        toast.error("invalid city or pincode");
      }
    
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="btn btn-primary px-4"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>

                {searched && filteredTiffinVendors.length === 0 && (
                  <p>No vendors found for the given location.</p>
                )}
                
              </div>
            </div>

            {tiffinVendors.length !== 0 && (
            <div>
              <div className="my-3">
                Sort By:
                <select
                  className="ms-2 me-5"
                  onChange={({ target }) => setSortBy(target.value)}
                  value={sortBy}
                >
                  <option value="default">default</option>
                  <option value="price">price</option>
                  <option value="rating">average rating</option>
                </select>
                Veg Only?{" "}
                <label className="switch">
                  <input
                    type="checkbox"
                    name="veg filter"
                    value={vegFilter}
                    checked={vegFilter}
                    onChange={({ target }) =>
                      setVegFilter(target.value === "false" ? true : false)
                    }
                  />
                </label>
              </div>
              <div className="container">          
                <div className="row tiffin-vendor-detail mt-5">
                  {tiffinVendors && tiffinVendors.length > 0 && tiffinVendors.map((value) => ( 
                    <div className="col-lg-3 col-md-3 col-sm-12">
                      <div className="tiffin-vendor-card shadow-lg ">                  
                        <div className="card-body" key={value.id}>
                          <img className="card-image" src={value.image} alt="Tiffin image"/>  
                          <div className="card-content">                  
                            <h6 className="business-name">{value.vendorName}</h6>
                            <p className="mb-1">
                              {value.address}
                            </p>
                          </div>
                          {/* <h6>Prices</h6>
                            <ul>
                              {Object.entries(value.prices).map(([type, price]) => (
                                <li key={type}>
                                  {type}: {price}
                                </li>
                              ))}
                            </ul>                                  */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>            
          )}
          </div>
        </React.Fragment>
    );
  }

export default CustomerHome;
