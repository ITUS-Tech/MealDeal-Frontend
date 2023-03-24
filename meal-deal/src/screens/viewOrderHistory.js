import React, { useEffect, useState } from "react";
import "../styles/viewOrderHistory.css";

function ViewOrderHistory(props) {

  const userId = props.user;
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `https://mealdeal.herokuapp.com/order/user/${userId}`;
    const fetchData = async () => {
      try {
        await fetch(url)
        .then(response => response.json())
        .then(res => setData(res));
      }
      catch (error) {
        console.log("error", error);
      }
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row mt-3">
          <h3 className="mb-4">Your Orders:</h3>
          {data &&
            data.length > 0 &&
            data.map((order) => (
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="card shadow-sm">
                <div className="card--body">
                  <div className="card-content">
                    <div className="">
                      <h5 className="business-name">{order.vendorName}</h5>
                      <hr></hr>
                      {order.plans.map((plan) => (
                        <div className="col-sm-12">
                          <div className="row">
                            <div className="col-md-3">
                              <h6>
                                Subscription Type: <b>{plan.subscription}</b>
                              </h6>
                            </div>
                            
                          </div>
                        </div>
                      ))}
                      <p className="text-muted">
                        TOTAL AMOUNT: <b>{order.totalAmount}</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ViewOrderHistory;