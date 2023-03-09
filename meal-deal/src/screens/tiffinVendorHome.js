import React, {useState, useEffect } from "react";
import "../styles/tiffinVendorHome.css";
import { CardTitle, CardSubtitle } from "reactstrap";

function TiffinVendorHome(props) {
  
 const [data, setData] = useState({})
 const [plans, setPlans] = useState({})

  useEffect(() => {
    const url = "fetch URL";
    const fetchData = async () => {
      try {
        const response = await fetch(url)
          .then((response) => response.json())
          .then((res) => {
            setData(res);
            setPlans(res.plans);
            console.log(res);
            console.log(res.plans);
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
      <br></br>
      <h1>&nbsp;Welcome, [Vendor Name]</h1>
      <br></br>
      <h4>&nbsp;&nbsp; Orders:</h4>
      {plans.map((plan, index) => (
        <div className="card mx-3 my-3" key={index}>
        <div className="card-body">
            <div className="row">
              <div className="col-sm-6">
                <CardTitle tag="h5">Subscription Type: {plan.type}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Start Date: {plan.startDate}
                </CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  End Date: {plan.endDate}
                </CardSubtitle>
              </div>
              <div className="col-sm-6">
                <CardTitle tag="h5">Customer Details</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Name: {data.customerName}
                </CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Address: {data.address}
                </CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Phone: {data.phone}
                </CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Email: {data.email}
                </CardSubtitle>
              </div>
            </div>
            <CardSubtitle tag="h5" className="mt-2 text-muted">
              <b>Total Amount: {data.totalAmount}</b>
            </CardSubtitle>
            </div>
          </div>
      ))}
    </div>
  );
}

export default TiffinVendorHome;
