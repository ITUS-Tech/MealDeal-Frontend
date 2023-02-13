import React from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import "../styles/tiffinVendorCard.css";
import tiffin from  "../images/tiffin.jpg";

function TiffinVendorCard(props) {
  const { businessName, hasVeg, monthRate, rating, _id } = props.vendor;
  let navigate = useNavigate();
  return (
    <div
      className="tiffin-vendor-card col-lg-4 col-md-6 col-sm-12 my-2 hover-card"
      onClick={() => {
        navigate(`/customer/vendor/${_id}`);
      }}
    >
      <div className="card pointer">
        <div className="card-body p-0">
          <img className="card-image" src={tiffin} alt="Tiffin image"/>
          <div className="p-3">
            <h4 className="card-title">{businessName}</h4>
            <div className="card-subtitle text-muted">
              <p className={rating.numberOfRatings > 0 ? "d-inline" : "d-none"}>
                Rating:{" "}
              </p>
              <h6 className="d-inline">
                {rating.numberOfRatings > 0 &&
                  `${_.round(rating.currentRating, 1)}/5`}
              </h6>
              <p className="d-inline mx-2">
                {rating.numberOfRatings > 0 && `(${rating.numberOfRatings})`}
              </p>
            </div>
            <img
              className={hasVeg ? "veg-icon my-1" : "non-veg-icon my-1"}
              alt=""
            />
            <h5 className="card-title mt-2">Rs. {monthRate.oldRate}/month</h5>
            <p className="card-subtitle text-muted inline">
              <small>
                Get it at <strong>{monthRate.discountRate}/month</strong> with{" "}
                <strong>{monthRate.minMonthForNewRate}</strong> months
                subscription.{" "}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TiffinVendorCard;
