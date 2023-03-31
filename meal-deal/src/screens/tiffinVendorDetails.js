import React, { useEffect, useState } from "react";
//import logo from '../images/veg_icon.png';
//import Form from 'react-bootstrap/Form';
import "../styles/tiffinVendorDetails.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import { getDate } from "date-fns";
import "../styles/vendorDetails.css";

function TiffinVendorDetails(props) {
  const { userId, isLoggedIn, isCustomer } = props.user();
  const params = useParams();
  const [data, setData] = useState({});
  const [prices, setPrices] = useState({});
  const [menu, setMenu] = useState({});
  const [showHide, setShowHide] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [selectedOption, setSelectedOption] = useState("Day");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [index, setIndex] = useState(0);
  const [opacity, setOpacity] = useState(0.1);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    // Return true if the day is Monday (1) to Friday (5)
    return day >= 1 && day <= 5;
  };
  
  const getNextMonday = () => {
    const today = new Date();
    const day = today.getDay();
    const daysUntilMonday = day === 0 ? 1 : 8 - day;
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilMonday);
    return nextMonday;
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const getNextWeekend = () => {
    const today = new Date();
    const day = today.getDay();
  // If today is a Saturday or Sunday, return today
  if (day === 6 || day === 0) {
    return today;
  }
  
    // Otherwise, find the next Saturday or Sunday
    const nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + ((6 - day + 7) % 7));
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + ((7 - day + 7) % 7));
  
    // Return the closest weekend day
    return nextSunday < nextSaturday ? nextSunday : nextSaturday;
  };

  const renderDatePickers = () => {
    switch (selectedOption) {
      case "Day":
        return null;
      case "Week":
        return (
          <div className="row">
            <div className="col-md-6 date--range m-0">
              <label htmlFor="startDate">Start Date: </label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="dd/MM/yyyy"
                filterDate={isWeekend}
                minDate = {getNextWeekend()}
                placeholderText="Select start date"
              />
            </div>
            <div className="col-md-6 date--range m-0">
              <label htmlFor="endDate">End Date: </label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="dd/MM/yyyy"
                filterDate={isWeekend}
                minDate={getNextWeekend()}
                placeholderText="Select end date"
              />
            </div>
          </div>
        );
        case "Weekdays":
          const today = new Date();
          const startDate = isWeekend(today) ? getNextMonday() : today;
          return (
            <div className="row">
              <div className="col-md-6 date--range m-0">
                <label htmlFor="startDate">Start Date: </label>
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  dateFormat="dd/MM/yyyy"
                  filterDate={isWeekday}
                  minDate={today}
                  placeholderText="Select start date"
                />
              </div>
              <div className="col-md-6 date--range m-0">
                <label htmlFor="endDate">End Date: </label>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  dateFormat="dd/MM/yyyy"
                  filterDate={isWeekday}
                  minDate={startDate}
                  placeholderText="Select end date"
                />
              </div>
            </div>
          );
      default:
        return (
          <div className="row">
            <div className="col-md-6 date--range m-0">
              <label htmlFor="startDate">Start Date: </label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select start date"
              />
            </div>
            <div className="col-md-6 date--range m-0">
              <label htmlFor="endDate">End Date: </label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                minDate={startDate}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select end date"
              />
            </div>
          </div>
        );
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleshow = (e) => {
    const getshow = e.target.value;
    setShowHide(getshow);
    setShowPrice(prices[getshow]);
    setIsSelected(true);
  };

  // var dataStore = {
  //   userId: 1,
  //   vendorId: data.id,
  //   vendorName: data.vendorName,
  //   startDate: startDate.toISOString().substring(0, 10),
  //   endDate: endDate ? endDate.toISOString().substring(0, 10) : null,
  //   items: [
  //     {
  //       subscription: showHide,
  //       price: showPrice,
  //       quantity: quantity,
  //     },
  //   ],
  // };

  // const images = [
  //   "https://picsum.photos/id/1015/800/600",
  //   "https://picsum.photos/id/1016/800/600",
  //   "https://picsum.photos/id/1018/800/600",
  // ];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prevIndex) => (prevIndex + 1) % images.length);
  //     setOpacity(0.1);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const url = `http://mealdeal.herokuapp.com/vendor/${params.id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url)
          .then((response) => response.json())
          .then((res) => {
            setData(res);
            setMenu(res.menu);
            setPrices(res.prices);
            console.log(res);
            console.log(res.menu);
            console.log(res.prices);
          });
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  async function handleClick() {

    if (
      (showHide === "Week" || showHide === "Weekdays" || showHide === "Fortnight" || showHide === "Month") &&
      (!startDate || !endDate)
    ) {
      alert("Please select both start and end dates.");
      return;
    }

    if (quantity < 1) {
      alert("Please enter a quantity of at least 1.");
      return;
    }

    var dataStore = {
      userId: 1,
      vendorId: data.id,
      vendorName: data.vendorName,
      items: [
        {
          subscription: showHide,
          price: showPrice,
          quantity: quantity,
          startDate: startDate.toISOString().substring(0, 10),
          endDate: endDate.toISOString().substring(0, 10),
        },
      ],
    };
    console.log(typeof(dataStore.endDate));
    console.log(dataStore);
    // Send data to the backend via POST
    const response = await fetch(`http://mealdeal.herokuapp.com/cart/add/${userId}`, {
      // Enter your IP address here

      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataStore),
      
    });

    if (response.ok) {
      setAlertMessage("Added to cart successfully!");
      setShowAlert(true); // Show the alert
      setTimeout(() => {
        setShowAlert(false); // Hide the alert after 4 seconds
      }, 4000);
    } else {
      setAlertMessage("Failed to add to cart.");
      setShowAlert(true); // Show the alert
      setTimeout(() => {
        setShowAlert(false); // Hide the alert after 4 seconds
      }, 4000);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="tiffin-vendor-detail mt-1">
      <section className="section-content padding-y bg">
        <div className="container">
        {showAlert && (
            <div className="alert alert-success" role="alert">
              {alertMessage}
            </div>
          )}
          <h3 className="title">{data.vendorName}</h3>
          <div className="vendor-address">{data.address}</div>
          <div className="row">
            <div className="col-md-6">
              <div className="vendor-subscription--card">
                <h5 className="vendor--subscription mt-4 mb-4">Subscription</h5>
                <div className="form-group mb-4">
                  <div className="row">
                    <center>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {prices &&
                              Object.keys(prices).map((key) => (
                                <div key={key} id={key}>
                                  <input
                                    type="radio"
                                    id={key}
                                    name="price"
                                    value={key}
                                    onClick={handleshow}
                                    checked={selectedOption === key}
                                    onChange={handleOptionChange}
                                  />
                                  <label
                                    htmlFor={key}
                                    // style={{ marginLeft: "10px" }}
                                  >
                                    {" "}
                                    &nbsp;{key}
                                  </label>
                                </div>
                              ))}
                          </div>
                        </div>
                      </center>
                    </div>{" "}
                    {showHide && (
                      <div className="mt-3">
                        <h6 className="label">
                          Price:
                          <b>
                            <var className="price">
                              &nbsp;{prices[showHide]}$ /{showHide}
                            </var>
                          </b>
                        </h6>
                      </div>
                    )}
                    {showHide === "Day" && (
                      <div>
                        <div className="mt-3 mb-2">
                          <h6 className="label">Quantity</h6>
                        </div>
                        <button
                          onClick={handleDecrease}
                          className="reduce--quantity-btn btn btn-outline-danger btn-lg"
                        >
                          -
                        </button>{" "}
                        &nbsp;
                        {quantity} &nbsp;
                        <button
                          onClick={handleIncrease}
                          className="increase--quantity-btn btn btn-outline-success btn-lg"
                        >
                          +
                        </button>
                      </div>
                    )}
                    {showHide === "Weekdays" && (
                      <div>
                        <div className="mt-3">
                          {/* <h5 className="label">Enter Date Range</h5> */}
                          {renderDatePickers()}
                        </div>
                        <div className="mt-3 mb-2">
                          <h6 className="label">Quantity</h6>
                        </div>
                        <button
                          onClick={handleDecrease}
                          className="reduce--quantity-btn btn btn-outline-danger btn-lg"
                        >
                          -
                        </button>{" "}
                        &nbsp;
                        {quantity} &nbsp;
                        <button
                          onClick={handleIncrease}
                          className="increase--quantity-btn btn btn-outline-success btn-lg"
                        >
                          +
                        </button>
                      </div>
                    )}
                    {showHide === "Week" && (
                      <div>
                        <div className="mt-3">
                          {/* <h5 className="label">Enter Date Range</h5> */}
                          {renderDatePickers()}
                        </div>
                        <div className="mt-3 mb-2">
                          <h6 className="label">Quantity</h6>
                        </div>
                        <button
                          onClick={handleDecrease}
                          className="reduce--quantity-btn btn btn-outline-danger btn-lg"
                        >
                          -
                        </button>{" "}
                        &nbsp;
                        {quantity} &nbsp;
                        <button
                          onClick={handleIncrease}
                          className="increase--quantity-btn btn btn-outline-success btn-lg"
                        >
                          +
                        </button>
                      </div>
                    )}
                    {showHide === "Fortnight" && (
                      <div>
                        <div className="mt-3">
                          {/* <h5 className="label">Enter Date Range</h5> */}
                          {renderDatePickers()}
                        </div>
                        <div className="mt-3 mb-2">
                          <h6 className="label">Quantity</h6>
                        </div>
                        <button
                          onClick={handleDecrease}
                          className="reduce--quantity-btn btn btn-outline-danger btn-lg"
                        >
                          -
                        </button>{" "}
                        &nbsp;
                        {quantity} &nbsp;
                        <button
                          onClick={handleIncrease}
                          className="increase--quantity-btn btn btn-outline-success btn-lg"
                        >
                          +
                        </button>
                      </div>
                    )}
                    {showHide === "Month" && (
                      <div>
                        <div className="mt-3">
                          {/* <h5 className="label">Enter Date Range</h5> */}
                          {renderDatePickers()}
                        </div>
                        <div className="mt-3 mb-2">
                          <h6 className="label">Quantity</h6>
                        </div>
                        <button
                          onClick={handleDecrease}
                          className="reduce--quantity-btn btn btn-outline-danger btn-lg"
                        >
                          -
                        </button>{" "}
                        &nbsp;
                        {quantity} &nbsp;
                        <button
                          onClick={handleIncrease}
                          className="increase--quantity-btn btn btn-outline-success btn-lg"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                  <br></br>

                  <div className="">
                    {/* <pre>{JSON.stringify(dataStore, null, 2) }</pre> */}
                    <a className="btn btn-primary" onClick={handleClick}>
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div className="vendor-menu--card">
                  <h5 className="mb-4 text-center">Menu</h5>
                  <div>
                    {/* <h2>Menu</h2> */}

                    {/* <ul>
                    {menu &&
                      Object.keys(menu).map((key) => (
                        <li key={key}>
                          {key}: {menu[key]}
                        </li>
                      ))}
                  </ul> */}
                  <pre>
                    {data.menu}
                  </pre>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <div className="outer-wrapper">
                  <div className="frame">
                    <img
                      className="vendor--card-img img-responsive center-block d-block mx-auto"
                      src={data.image}
                    />
                  </div>
                </div>
              </div>
              <div>
  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TiffinVendorDetails;
