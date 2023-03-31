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
          .then((response) => response.json())
          .then((res) => setData(res));
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div>
        <h5 className="mb-4 text-center">Your Order History</h5>
        {data &&
          data.length > 0 &&
          data.map((order) => (
            <div>
              <h6 className="business-name text-center">{order.vendorName}</h6>
              <table className="table">
                <thead>
                  <tr>
                    <th>Subscription type</th>
                    <th>Start Date</th>
                    <th>End Date:</th>
                  </tr>
                </thead>
                <tbody>
                  {order.plans.map((plan) => (
                    <tr>
                      <td>{plan.subscription}</td>
                      <td>{plan.startDate}</td>
                      <td>{plan.endDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="text-right">
                TOTAL AMOUNT: <b>{order.totalAmount}</b>
              </p>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
}

export default ViewOrderHistory;
