import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getTiffinVendors } from "../services/vendorService";
import { getTiffinVendorById } from "../services/vendorService";
import { addReview } from "../services/customerService";
import FormInput from "../common/formInput";
import Subscribe from "./subscribe";
import "../styles/tiffinVendorDetails.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TiffinVendorDetails(props) {
  // const { isLoggedIn, isCustomer, token } = props.auth;
  const [vendor, setVendor] = useState({});
  // const [reviewBox, setreviewBox] = useState(false);
  // const [review, setReview] = useState(initialReviewState);
  const [render, setRender] = useState(false);
  const [subscribe, setSubscribe] = useState(false);

  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    // async function getTiffinVendor() {
      // getTiffinVendors();
      const fetchPromise = fetch("http://localhost:8080/vendor/", {    
        method: 'GET',    
        headers: { 'Content-Type' : 'application/json'},      
      })
      .then((response) => response.json())
      .then(res => {setVendor(res)})
      .catch((err)=>{console.log(err)})
      // const vendorDetails = getTiffinVendors();
      console.log(vendor);
      // if (vendorDetails === null) {
      //   console.log("null");
      //   return
      // };
      // if (vendorDetails === false) {
      //   toast.error("Tiffin Vendor not found!");
      //   navigate("/customer");
      //   console.log("false");
      // } else {
      //   console.log(vendorDetails);
      //   setVendor(vendorDetails);
      //   // console.log(setVendor());
      // }
    // }
    // getTiffinVendor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const onReviewChange = ({ currentTarget: input }) => {
  //   const currReview = { ...review };
  //   currReview[input.name] = input.value;
  //   // setReview(currReview);
  // };

  // const handleReviewSubmit = async () => {
  //   if (isLoggedIn && isCustomer) {
  //     const error = await addReview(review, token, id);
  //     if (error === null) return null;
  //     if (error.status && error.status === 400) toast.error("invalid review");
  //     if (error.status && error.status === 404) toast.error(error.message);
  //     else if (error === true) {
  //       // setReview(initialReviewState);
  //       setRender(!render);
  //       // setreviewBox(false);
  //       toast.success("review added");
  //     }
  //   } else toast.error("please login to add review");
  // };

 
  
  // return(
  //   <div className="container">
  //   {vendor && vendor.length > 0 && vendor.map((val) => (
  //     <div className="my-3">
  //       <div className="card-title">

  //       </div>
  //       <p>{val.vendorName}</p><p>{val.id}</p><p>{val.address}</p></div>
  //   ))}
  //   </div>
  // );
  //  {
  //   if (!subscribe) {
      return (
        <div className="container">          
          <div className="row tiffin-vendor-detail mt-5">
            {vendor && vendor.length > 0 && vendor.map((value) => ( 
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="tiffin-vendor-card shadow-lg p-4">                  
                  <div className="card-body" key={value.id}>
                    {/* <img className="card-image" src={tiffin} alt="Tiffin image"/> */}                    
                    <h6 className="business-name">{value.vendorName}</h6>
                    <p className="mb-1">
                      <b>Address :</b> {value.address}
                    </p>
                    <h6>Menu</h6>
                    <ul>
                      {Object.entries(value.menu).map(([day, food]) => (
                        <li key={day}>
                          {day}: {food}
                        </li>
                      ))}
                    </ul>
                    <h6>Prices</h6>
                      <ul>
                        {Object.entries(value.prices).map(([type, price]) => (
                          <li key={type}>
                            {type}: {price}
                          </li>
                        ))}
                      </ul>                                 
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } 
  //   else {
  //     return <Subscribe vendor={vendor} auth={props.auth} />;
  //   }
  // }
  // return null;
// }

export default TiffinVendorDetails;
