import React, { useState, useEffect } from "react";
import "../styles/tiffinVendorHome.css";
import { CardTitle, CardSubtitle } from "reactstrap";

function TiffinVendorHome(props) {
  const { userId, isLoggedIn, isCustomer } = props.user();
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const url = `https://mealdeal.herokuapp.com/order/${userId}`;
    const fetchData = async () => {
      try {
        await fetch(url)
          .then((response) => response.json())
          .then((res) => {
            setData(res);
            console.log(res[0]);
            setName(res[0].vendorName);
            //setPlans(data.plans);
            console.log(data);
            //console.log(res.plans);
          });
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  // var dataStore =
  // {
  // userId: data.userId,
  // customerName: data.customerName,
  // plans: [
  //   {
  //     type: data.type,
  //     startDate: data.startDate,
  //     endDate: data.endDate,
  //   },
  // ],
  // totalAmount: data.totalAmount,
  // address: data.address,
  // phone: data.phone,
  // email: data.email,
  // };

  return (
    <div className="tiffin-vendor-home">
      <div className="container">
        <div className="row">
          <h3 className="mb-4">Welcome, {name}</h3>
          <h5 className="">Orders:</h5>
          {data &&
            data.length > 0 &&
            data.map((order) => (
              <div>
                <div className="card mx-3 my-3">
                  <div className="card-body">
                    <div className="row">
                      {order.plans.map((plan) => (
                        <div className="col-sm-12">
                          <div className="row">
                            <div className="col-md-3">
                              <h6>
                                Subscription Type: <b>{plan.subscription}</b>
                              </h6>
                            </div>
                            <div className="col-md-3">
                              <p className="mb-2 text-muted">
                                Start Date: {plan.startDate}
                              </p>
                            </div>
                            <div className="col-md-3">
                              <p className="mb-2 text-muted">
                                End Date: {plan.endDate}
                              </p>
                            </div>
                          </div>
                          {/* <CardTitle tag="h5">
                            
                          </CardTitle>
                          <CardSubtitle tag="h6" className="mb-2 text-muted">
                            
                          </CardSubtitle>
                          <CardSubtitle tag="h6" className="mb-2 text-muted">
                            
                          </CardSubtitle> */}
                        </div>
                      ))}
                      <div className="col-sm-12">
                        <h6>Customer Details</h6>
                        <div className="row">
                          <div className="col-md-3">
                            <h6 className="mb-2 text-muted">
                              Name: {order.customerName}
                            </h6>
                          </div>
                          <div className="col-md-3">
                            <h6 className="mb-2 text-muted">
                              Address: {order.address}
                            </h6>
                          </div>
                          <div className="col-md-3">
                            <h6 className="mb-2 text-muted">
                              Phone: {order.phone}
                            </h6>
                          </div>
                          <div className="col-md-3">
                            <h6 className="mb-2 text-muted">
                              Email: {order.email}
                            </h6>
                          </div>
                        </div>

                        {/* <CardSubtitle tag="h6" >
                          
                        </CardSubtitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                          
                        </CardSubtitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                          
                        </CardSubtitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                          
                        </CardSubtitle> */}
                      </div>
                    </div>
                    <CardSubtitle tag="h5" className="mt-2 text-muted">
                      <b>Total Amount: {order.totalAmount}</b>
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TiffinVendorHome;
