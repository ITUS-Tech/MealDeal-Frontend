import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "../styles/viewOrderHistory.css";

function ViewOrderHistory(props) {
  const navigate = useNavigate();

  //Fetching the data from API
  useEffect(() => {
    const fetchPromise = fetch("http://mealdeal.herokuapp.com/vendor", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row mt-3">
          <h3 className="mb-4">Your Past Orders</h3>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card shadow-sm">
              <div className="card--body">
                <div className="card-content">
                  <div className="">
                    <h5 className="business-name">Vendor Name</h5>
                    <hr></hr>
                    <p className="text-muted">
                      SUBSCRIPTION: <b>Weekly</b>
                    </p>
                    <ul class="list-inline">
                      <li class="list-inline-item text-muted">
                        START DATE: <b>03/03/2023</b>
                      </li>
                      <li class="list-inline-item text-muted">
                        END DATE: <b>03/09/2023</b>
                      </li>
                    </ul>
                    <p className="text-muted">
                      TOTAL AMOUNT: <b>$32.00</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ViewOrderHistory;
