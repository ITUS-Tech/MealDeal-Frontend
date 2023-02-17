import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPrice, subscribe } from "../services/subscriptionService";
import { toast } from "react-toastify";
import "../styles/subscribe.css";


function Subscribe(props) {
  const { monthRate, _id: vendorId, businessName, routine } = props.vendor;
  const { isLoggedIn, isCustomer, token } = props.auth;
  let navigate = useNavigate();
  const [meals, setMeals] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });
  const [days, setDays] = useState(30);

  const handleMealChange = ({ target }) => {
    const currMeal = { ...meals };
    let key = target.name;
    if (typeof key === "undefined") key = target.innerText;
    currMeal[key] = !currMeal[key];
    setMeals(currMeal);
  };

  const handleDaysChange = ({ target }) => {
    setDays(parseInt(target.value) + 30);
  };

  const handleSubscribe = async () => {
    if (isLoggedIn && isCustomer) {
      const error = await subscribe(vendorId, meals, days, token);
      if (error) {
        if (error.status === 400)
          toast.error("invalid subscription. please try again");
        else toast.error("please login and try again.");
      } else {
        toast.success("subscription added successfully");
        navigate("/customer");
      }
    }
  };

  return (
    <div className="subscribe">
      <div className="card mx-auto mt-5">
        <div className="card-body px-5 py-4">
          <h3 className="business-name">Subscribe to {businessName}</h3>
          <p className="lead">Breakfast: {routine.breakfast}</p>
          <p className="lead">
            Lunch:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{routine.lunch}
          </p>
          <p className="lead">
            Dinner:&nbsp;&nbsp;&nbsp;&nbsp;{routine.dinner}
          </p>
          <h5 className="card-title mt-4">
            Rs. {monthRate.oldRate}/30days{" "}
            <p className="d-inline fw-lighter">for each meal</p>
          </h5>
          <p className="card-subtitle text-muted mb-5 inline">
            <small>
              <strong className="h5">
                Rs. {monthRate.discountRate}/30days
              </strong>{" "}
              for each meal with minimum subscription of
              <strong className="h5">
                {" "}
                {monthRate.minMonthForNewRate * 30}
              </strong>{" "}
              days.
            </small>
          </p>
          <h6>Choose your meal times</h6>
          {Object.entries(meals).map(([meal, value]) => {
            return (
              <div key={meal} className="form-check">
                <input
                  type="checkbox"
                  name={meal}
                  onChange={handleMealChange}
                  checked={value}
                />
                <label className="form-check-label ms-2" htmlFor={meal}>
                  <p
                    className="fst-italic"
                    name={meal}
                    onClick={handleMealChange}
                  >
                    {meal}
                  </p>
                </label>
              </div>
            );
          })}

          <label htmlFor="days" className="form-label">
            <p className="lead d-inline"> subscription days:</p>{" "}
            <h5 className="d-inline">{days}</h5>
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="330"
            step="30"
            value={days - 30}
            onChange={handleDaysChange}
          />
          <div className="row">
            <div className="col-6">
              <h1>Rs. {getPrice(days, monthRate, meals)}</h1>
            </div>
            <div className="col-6 text-end m-auto">
              <button className="btn btn-primary" onClick={handleSubscribe}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
