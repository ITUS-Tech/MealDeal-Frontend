import React, {useState, useEffect } from "react";
import "../styles/tiffinVendorHome.css";
import { CardTitle, CardSubtitle } from "reactstrap";

function TiffinVendorHome(props) {
  const { userId, isLoggedIn, isCustomer } = props.user();
 const [data, setData] = useState([])
 const [name, setName] = useState("")

  useEffect(() => {
    const url = `https://mealdeal.herokuapp.com/order/${userId}`;
    const fetchData = async () => {
      try {
        await fetch(url)
          .then((response) => response.json())
          .then((res) => {
            setData(res);
            console.log(res[0])
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
      <br></br>
      <h1>&nbsp;Welcome, {name}</h1>
      <br></br>
      <h4>&nbsp;&nbsp; Orders:</h4>
      {data.map((order) => (
      <div>
        <div className="card mx-3 my-3">
        <div className="card-body">
            <div className="row">
              {order.plans.map((plan) => (
              <div className="col-sm-6">
                <CardTitle tag="h5">Subscription Type: {plan.subscription}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Start Date: {plan.start}
                </CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  End Date: {plan.end}
                </CardSubtitle>
              </div>))}
              <div className="col-sm-6">
                <CardTitle tag="h5">Customer Details</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Name: {order.customerName}
                </CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Address: {order.address}
                </CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Phone: {order.phone}
                </CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Email: {order.email}
                </CardSubtitle>
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
  );
}

export default TiffinVendorHome;
