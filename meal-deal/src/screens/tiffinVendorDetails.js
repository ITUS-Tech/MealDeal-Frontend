import React, { useEffect, useState } from "react";
//import logo from '../images/veg_icon.png';
//import Form from 'react-bootstrap/Form';
import "../styles/tiffinVendorDetails.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

function TiffinVendorDetails(props) {

  var Day = "Day";
  var Weekdays = "Weekdays";
  var Fortnight = "Fortnight";
  var Month = "Month";
  var Week = "Week";
  const params = useParams();
  const [data, setData] = useState({});
  const [prices, setPrices] = useState({});
  const [menu, setMenu] = useState({});
  const [showHide, setShowHide] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [quantity, setQuantity] = useState(0);
  // const [price, setPrice] = useState("")
  
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleshow=e=>{
    const getshow= e.target.value;
    setShowHide(getshow);
  }

  const handlepriceshow=e=>{
  const getshowprice= e.target.value;
    setShowPrice(getshowprice);
  }

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };


  useEffect(() => {
    const url = `http://localhost:8080/vendor/${params.id}`
    const fetchData = async () => {
        try {
            const response = await fetch(url).then((response)=> response.json()).then((res)=>{
              setData(res);
              setMenu(res.menu);
              setPrices(res.prices);
              console.log(res); 
              console.log(res.menu);
              console.log(res.prices)
            });
            //const json = await response.json(); 
            //console.log(json.vendorName.data);
            //setData(json.vendorName.data);
        } catch (error) {
            console.log("error", error);
        }
    };

    fetchData();
}, []);

var priceday = prices.Day;
var priceWeekdays = prices.Weekdays;
var priceWeek = prices.Week;
var priceFortnight = prices.Fortnight;
var priceMonth = prices.Month;

// const cartData = {
//   "userId":1,
//   "vendorName":data.vendorName,
//   "items" : {
//   "subscription": {showHide},
//   "price": 110,
//   "quantity": {quantity}
//   }
// }
// const sendData = async () => {
//   try {
//     await fetch('http://localhost:8080/cart/add/1',{
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(cartData)
//     });

//       //const json = await response.json(); 
//       //console.log(json.vendorName.data);
//       //setData(json.vendorName.data);
//   } catch (error) {
//       console.log("error", error);
//   }
// };


var dataStore ={
  vendorName : data.vendorName,
  items:
  {
    subscription : showHide,
    price: showPrice,
    itemquantity : quantity,
  }
  }
  function handleClick() {
  
    // Send data to the backend via POST
    fetch(`http://localhost:8080/vendor/${params.id}`, {  // Enter your IP address here

      method: 'POST', 
      mode: 'cors', 
      body: JSON.stringify(dataStore)

    })
  }

    return (

      <div className="tiffin-vendor-detail mt-1">
      <header class="section-header">
      <section class="header-main border-bottom">
      <div class="container">
      <div class="row align-items-center">
      <div class="col-sm col-sm col-sm">
          <h1><center>Vendor Details</center></h1>  
        </div>
      </div>
      </div> 
      </section> 
      </header> 
  
    <section class="section-content padding-y bg">
    <div  className="container">
    <div style={{ maxWidth: "1200px", margin: "0 auto" }} className="container"></div>
        <article class="card">
            <div class="card-body">
                    <div class="row">
                        <aside class="col-md-5">
                                <article class="gallery-wrap">
                                    <div class="card img-big-wrap">
                                        <img src={data.image}/>
                                    </div> 
                                    
                                </article>
                        </aside>
                        <main class="col-md-7">
                            <article>
                                <h3 class="title"><center>{data.vendorName}</center></h3>
                                <hr />
                                <div class="mb-3">
                                    <h6></h6>
                                  <center> 

                                  </center>
                                </div>
                                
                                <div class="form-group">
                                    <label class="text-muted"><center><h5>Subscription</h5></center></label>                                    
                                    <div>

                                <div class="form-check">
                                  <input class="form-check-input" type="radio" name="subscription" value={Day}  onClick = {handleshow}></input>
                                  <label class="form-check-label" for="flexRadioDefault1">
                                    {Day}
                                  </label>
                                </div>

                                <div class="form-check">
                                  <input class="form-check-input" type="radio" name="subscription" value={Weekdays} checked={showHide==={Weekdays}} onClick = {handleshow}></input>
                                  <label class="form-check-label" for="flexRadioDefault1">
                                  {Weekdays}
                                  </label>
                                </div>

                                <div class="form-check">
                                  <input class="form-check-input" type="radio" name="subscription" value={Week} checked={showHide==={Week}} onClick = {handleshow}></input>
                                  <label class="form-check-label" for="flexRadioDefault1">
                                    {Week}
                                  </label>
                                </div>
                              
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" name="subscription" value={Fortnight} checked={showHide==={Fortnight}} onClick = {handleshow}></input>
                                  <label class="form-check-label" for="flexRadioDefault1">
                                    {Fortnight}
                                  </label>
                                  </div>
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" name="subscription" value={Month} checked={showHide==={Month}} onClick = {handleshow}></input>
                                  <label class="form-check-label" for="subscription">
                                    {Month}
                                  </label>
                                </div>
                                </div>  <br></br> 
                                    
                                    
                                    {
                                      showHide===Day && 
                                    (
                                      <div class="d-flex justify-content-between">
                                      <label class="text-muted"><center><h5>Quantity</h5></center></label>
                                      <button onClick={handleDecrease} class="btn btn-secondary">
                                      -
                                      </button>
                                      <p class="text-center mb-0">{quantity}</p>
                                      <button onClick={handleIncrease} class="btn btn-secondary">
                                      +
                                      </button>
                                    </div> 
                                    )
                                    }
                                    
                                    {
                                      showHide=== Weekdays && 
                                    (
                                      <div >
                                      <label class="text-muted"><center><h5>Enter Date Range</h5></center></label> <br></br><br></br>
                                      <DatePicker
                                      isClearable
                                      filterDate={d => {
                                        return new Date() > d;
                                      }}
                                      placeholderText="Select Start Date"
                                      dateFormat="MMMM d, yyyy"
                                      selected={startDate}
                                      selectsStart
                                      startDate={startDate}
                                      endDate={endDate}
                                      onChange={date => setStartDate(date)}
                                      />  
                                      <DatePicker
                                      isClearable
                                      filterDate={d => {
                                        return new Date() > d;
                                      }} 
                                      placeholderText="Select End Date"
                                      dateFormat="MMMM d, yyyy"
                                      selected={endDate}
                                      selectsEnd
                                      startDate={startDate}
                                      endDate={endDate}
                                      minDate={startDate}
                                      onChange={date => setEndDate(date)}
                                      />
                                      <br></br>
                                      <label class="text-muted"><h5>Quantity</h5></label><br></br>
                                      <button onClick={handleDecrease} class="btn btn-secondary">
                                      -
                                      </button>
                                      {quantity}
                                      <button onClick={handleIncrease} class="btn btn-secondary">
                                      +
                                      </button>
                                     </div> 
                                    
                                     
                                    )
                                    }
                                    
                                    {
                                      showHide=== Week && 
                                    (
                                      <div>
                                      <label class="text-muted"><center><h5>Enter Date Range</h5></center></label> <br></br><br></br>
                                      <DatePicker
                                      isClearable
                                      filterDate={d => {
                                        return new Date() > d;
                                      }}
                                      placeholderText="Select Start Date"
                                      dateFormat="MMMM d, yyyy"
                                      selected={startDate}
                                      selectsStart
                                      startDate={startDate}
                                      endDate={endDate}
                                      onChange={date => setStartDate(date)}
                                      />  
                                      <DatePicker
                                      isClearable
                                      filterDate={d => {
                                        return new Date() > d;
                                      }} 
                                      placeholderText="Select End Date"
                                      dateFormat="MMMM d, yyyy"
                                      selected={endDate}
                                      selectsEnd
                                      startDate={startDate}
                                      endDate={endDate}
                                      minDate={startDate}
                                      onChange={date => setEndDate(date)}
                                      />
                                      <br></br>
                                      <label class="text-muted"><h5>Quantity</h5></label><br></br>
                                      <button onClick={handleDecrease} class="btn btn-secondary">
                                      -
                                      </button>
                                      <p class="text-center mb-0">{quantity}</p>
                                      <button onClick={handleIncrease} class="btn btn-secondary">
                                      +
                                      </button>
                                     </div> 
                                    )
                                    }
                                    {
                                      showHide=== Fortnight && 
                                    (
                                      <div>
                                      <label class="text-muted"><center><h5>Enter Date Range</h5></center></label> <br></br><br></br>
                                      <DatePicker
                                      isClearable
                                      filterDate={d => {
                                        return new Date() > d;
                                      }}
                                      placeholderText="Select Start Date"
                                      dateFormat="MMMM d, yyyy"
                                      selected={startDate}
                                      selectsStart
                                      startDate={startDate}
                                      endDate={endDate}
                                      onChange={date => setStartDate(date)}
                                      />  
                                      <DatePicker
                                      isClearable
                                      filterDate={d => {
                                        return new Date() > d;
                                      }} 
                                      placeholderText="Select End Date"
                                      dateFormat="MMMM d, yyyy"
                                      selected={endDate}
                                      selectsEnd
                                      startDate={startDate}
                                      endDate={endDate}
                                      minDate={startDate}
                                      onChange={date => setEndDate(date)}
                                      />
                                      <br></br>
                                      <label class="text-muted"><h5>Quantity</h5></label><br></br>
                                      <button onClick={handleDecrease} class="btn btn-secondary">
                                      -
                                      </button>
                                      <p class="text-center mb-0">{quantity}</p>
                                      <button onClick={handleIncrease} class="btn btn-secondary">
                                      +
                                      </button>
                                     </div> 
                                    )
                                    }
                                    {
                                      showHide=== Month && 
                                    (
                                      <div>
                                      <label class="text-muted"><center><h5>Enter Date Range</h5></center></label> <br></br><br></br>
                                      <DatePicker
                                      isClearable
                                      filterDate={d => {
                                        return new Date() > d;
                                      }}
                                      placeholderText="Select Start Date"
                                      dateFormat="MMMM d, yyyy"
                                      selected={startDate}
                                      selectsStart
                                      startDate={startDate}
                                      endDate={endDate}
                                      onChange={date => setStartDate(date)}
                                      />  
                                      <DatePicker
                                      isClearable
                                      filterDate={d => {
                                        return new Date() > d;
                                      }} 
                                      placeholderText="Select End Date"
                                      dateFormat="MMMM d, yyyy"
                                      selected={endDate}
                                      selectsEnd
                                      startDate={startDate}
                                      endDate={endDate}
                                      minDate={startDate}
                                      onChange={date => setEndDate(date)}
                                      />
                                      <br></br>
                                      <label class="text-muted"><h5>Quantity</h5></label><br></br>
                                      <button onClick={handleDecrease} class="btn btn-secondary">
                                      -
                                      </button>
                                      <p class="text-center mb-0">{quantity}</p>
                                      <button onClick={handleIncrease} class="btn btn-secondary">
                                      +
                                      </button>
                                     </div> 
                                    )
                                    }
                                    
                                </div><br></br>
                                <label class="text-muted"><center><h5>Check Price ?</h5></center></label>
                                {
                                      showHide=== Day && 
                                    (
                                      <div id = "Day"> YES &nbsp;
                                  <input type="radio" name="prices" defaultChecked value={priceday} checked={showPrice==={priceday}} onClick={ handlepriceshow}></input>
                                  <label class="form-check-label" for="flexRadioDefault1"></label><br></br>
                                      <var class="price h4 ">&nbsp;{priceday}$ /{Day}</var>
                                      
                                     </div> 
                                     
                                    )
                                    
                                }
                                {
                                      showHide=== Weekdays && 
                                    (
                                      <div id = "Weekdays">YES &nbsp;
                                  <input type="radio" name="prices" value={priceWeekdays} checked={showPrice==={priceWeekdays}} onClick={ handlepriceshow}></input>
                                  <label class="form-check-label" for="flexRadioDefault1"></label><br></br>
                                      <var class="price h4 ">&nbsp;{priceWeekdays}$ /{Weekdays}</var>
                                      
                                     </div> 
                                     
                                    )
                                    
                                }
                                
                                {
                                      showHide=== Week && 
                                    (

                                      <div id = "Week">YES &nbsp;
                                      <input type="radio" name="prices" value={priceWeek} checked={showPrice==={priceWeek}} onClick={handlepriceshow}></input>
                                      <label class="form-check-label" for="flexRadioDefault1"></label><br></br>
                                      <var class="price h4 ">&nbsp;{priceWeek}$ /{Week  }</var>
                                      
                                     </div> 
                                    )

                                }
                                {
                                      showHide=== Fortnight && 
                                    (
                                      <div id = "Fortnight">YES &nbsp;
                                      <input type="radio" name="prices" value={priceFortnight} checked={showPrice==={priceFortnight}} onClick={handlepriceshow}></input>
                                      <label class="form-check-label" for="flexRadioDefault1"></label><br></br>
                                      <var class="price h4 ">&nbsp;{priceFortnight}$ /{Fortnight}</var>
                                      
                                     </div> 
                                    )
                                }
                                {
                                      showHide=== Month && 
                                    (
                                      <div id = "Month">YES &nbsp;
                                      <input type="radio" name="prices" value={priceMonth} checked={showPrice==={priceMonth}} onClick={handlepriceshow}></input>
                                      <label class="form-check-label" for="flexRadioDefault1"></label><br></br>
                                      <var class="price h4 ">&nbsp;{priceMonth}$ /{Month}</var>
                                      
                                     </div> 
                                    )
                                }
                                
                                
                                <div class="mb-4">
                                  <br></br>
                                    <a class="btn btn-primary mr-1" onClick={handleClick()}>Add to cart</a>
                                </div>
                                
                            </article> 
                        </main>
                    </div> 
            </div> 
        </article>
        <article class="card mt-5">
            
                
                <p>
                <center>
                  <h5><br></br>
                    Menu Details</h5>
                    </center>
                    
                    <li>Monday: {menu.Monday}<br></br></li>
                    <li>Tuesday: {menu.Tuesday}<br></br></li>
                    <li>Wednesday: {menu.Wednesday}<br></br></li>
                    <li>Thursday: {menu.Thursday}<br></br></li>
                    <li>Friday: {menu.Friday}<br></br></li>
                    <li>Saturday: {menu.Saturday}<br></br></li>
                    <li>Sunday: {menu.Sunday}<br></br></li>
                    
                </p>
        </article>
        </div>   
    </section>
    </div>
    );


  
} 



export default TiffinVendorDetails;
