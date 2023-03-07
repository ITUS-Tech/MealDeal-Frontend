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

  const params = useParams();
  const [data, setData] = useState({});
  const [prices, setPrices] = useState({});
  const [menu, setMenu] = useState({});
  const [showHide, setShowHide] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [selectedOption, setSelectedOption] = useState('Day');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [isSelected, setIsSelected]= useState(false);
  const [index, setIndex] = useState(0);
  // const [Cdate, setDate] = useState(new Date().toLocaleDateString('fr-FR'));
  const [opacity, setOpacity] = useState(0.1);

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

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const renderDatePickers = () => {
    switch (selectedOption) {
      case "Day":
        return null;
      case "Week":
        return (
          <div>
            <label htmlFor="startDate">Start Date: </label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="dd/MM/yyyy"
              filterDate={isWeekend}
              placeholderText="Select start date"
            />
            <label htmlFor="endDate">End Date: </label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="dd/MM/yyyy"
              filterDate={isWeekend}
              minDate = {startDate}
              placeholderText="Select end date"
            />
          </div>
        );
      default:
        return (
          <div>
            <label htmlFor="startDate">Start Date: </label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              minDate = {new Date()}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select start date"
            />
            <label htmlFor="endDate">End Date: </label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              minDate =  {startDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select end date"
            />
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
  const handleshow=e=>{
    const getshow= e.target.value;
    setShowHide(getshow);
    setShowPrice(prices[getshow]);
    setIsSelected=true;
  }


  // var dataStore ={
  //   userId: 1,
  //   vendorName : data.vendorName,
  //   items:
  //   [
  //   {
  //     subscription : showHide,
  //     price: showPrice,
  //     quantity : quantity,
      
  //   }
  //   ]
  //   }

  const images = [
    "https://picsum.photos/id/1015/800/600",
    "https://picsum.photos/id/1016/800/600",
    "https://picsum.photos/id/1018/800/600",
  ];

  const style = {
    position: "fixed",
    top:0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${images[index]})`,
    backgroundSize: "cover",
    transition: "opacity 1s ease-in-out",
    opacity: opacity,
    zIndex: 0
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
      setOpacity(0.1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const url = `http://mealdeal.herokuapp.com/vendor/${params.id}`
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
        } catch (error) {
            console.log("error", error);
        }
    };

    fetchData();
}, []);

async function handleClick() {
  var dataStore =
  {
    userId: 1,
    vendorName : data.vendorName,
    items:
    [
    {
      subscription : showHide,
      price: showPrice,
      quantity : quantity,
      
    }
    ]
  }

  // Send data to the backend via POST
  await fetch(`http://mealdeal.herokuapp.com/cart/add/1`, {  // Enter your IP address here

    method: 'PUT',
    headers:
    {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(dataStore)

  })
}

    return (

      <div className="tiffin-vendor-detail mt-1">
        
      <header className="section-header">
      <section className="header-main border-bottom">
      <div className="container">
      <div className="row align-items-center">
      <div className="col-sm col-sm col-sm">
          <h1><center>Vendor Details</center></h1>  
        </div>
      </div>
      </div> 
      
      </section> 
      </header> 
      <div style={{ position: "fixed", width: "800px", height: "600px" }}>
      <div style={style} />
      {/* Your existing code goes here */}
    </div>
    <section className="section-content padding-y bg" >
    <div  className="container" > 
    
    <div style={{ maxWidth: "1200px", margin: "0 auto"  }} className="container"></div>
        <article className="card" >

                    <div className="row justify-content-center">
                        <aside className="col">
                                <article  className="gallery-wrap" style={{ width: "80%", margin: "0 auto" }}>
                                    <div className="card img-big-wrap" style={{ width: "500px", height: "300px" }}>
                                        <img src={data.image}
                                        style={{ width: '500px', height: '300px' }}/>
                                    </div> 
                                    
                                </article>
                        </aside>
                        <main className="col-md-7" >
                            <article  >
                              <center >
                                <h3 className="title" ><center>{data.vendorName}</center></h3>
                                <hr />
                                <div className="mb-3" >
                                    <h6></h6>
                                  <center> 

                                  </center>
                                </div>
                                
                                <div className="form-group" >
                                    <label className="text-muted"><center><h5>Subscription</h5></center></label>                                    
                                    <div>
                                    <div><center>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                    {prices &&
                                      Object.keys(prices).map((key) => (
                                        <div key={key} id={key} >
                                          <input type="radio" id={key} name="price" value={key}  onClick= {handleshow} checked={selectedOption === key} onChange={handleOptionChange}/>
                                          <label htmlFor={key} style={{ marginLeft: "10px" }}> &nbsp;{key}</label>
                                        </div>
                                      ))}</div></div>
                                      </center>
                                  </div>
                                </div>  <br></br>
                                {showHide && (
                                <div>
                                  <label className="text-muted"><center><h5>Price </h5></center></label>
                                  <var className="price h4 ">&nbsp;{prices[showHide]}$ /{showHide}</var>
                                </div>
                              )}
                                    
                                    {
                                      showHide=== 'Day' && 
                                    (
                                      <div>
                                      <label className="text-muted"><h5>Quantity</h5></label><br></br>
                                      <button onClick={handleDecrease} className="btn btn-secondary">
                                      -
                                      </button> &nbsp;
                                      {quantity} &nbsp;
                                      <button onClick={handleIncrease} className="btn btn-secondary">
                                      +
                                      </button>
                                    </div> 
                                    )
                                    }
                                    
                                    {
                                      showHide=== 'Weekdays' && 
                                    (
                                      <div >
                                      <label className="text-muted"><center><h5>Enter Date Range</h5></center></label>  
                                      {renderDatePickers()} 
                                      <br></br>
                                      <label className="text-muted"><h5>Quantity</h5></label><br></br>
                                      <button onClick={handleDecrease} className="btn btn-secondary">
                                      -
                                      </button> &nbsp;
                                      {quantity} &nbsp;
                                      <button onClick={handleIncrease} className="btn btn-secondary">
                                      +
                                      </button>
                                     </div> 
                                    
                                    
                                    )
                                    }
                                    
                                    {
                                      showHide=== 'Week' && 
                                    (
                                      <div>
                                      <label className="text-muted"><center><h5>Enter Date Range</h5></center></label>
                                      {renderDatePickers()}
                                      <br></br>
                                      <label className="text-muted"><h5>Quantity</h5></label><br></br>
                                      <button onClick={handleDecrease} className="btn btn-secondary">
                                      -
                                      </button> &nbsp;
                                      {quantity} &nbsp;
                                      <button onClick={handleIncrease} className="btn btn-secondary">
                                      +
                                      </button>
                                     </div> 
                                    )
                                    }
                                    {
                                      showHide=== 'Fortnight' && 
                                    (
                                      <div>
                                      <label className="text-muted"><center><h5>Enter Date Range</h5></center></label>
                                      {renderDatePickers()}
                                      <br></br>
                                      <label className="text-muted"><h5>Quantity</h5></label><br></br>
                                      <button onClick={handleDecrease} className="btn btn-secondary">
                                      -
                                      </button> &nbsp;
                                      {quantity} &nbsp;
                                      <button onClick={handleIncrease} className="btn btn-secondary">
                                      +
                                      </button>
                                     </div> 
                                    )
                                    }
                                    {
                                      showHide=== 'Month' && 
                                    (
                                      <div>
                                      <label className="text-muted"><center><h5>Enter Date Range</h5></center></label>
                                      {renderDatePickers()}
                                      <br></br>
                                      <label className="text-muted"><h5>Quantity</h5></label><br></br>
                                      <button onClick={handleDecrease} className="btn btn-secondary">
                                      -
                                      </button> &nbsp;
                                      {quantity} &nbsp;
                                      <button onClick={handleIncrease} className="btn btn-secondary">
                                      +
                                      </button>
                                     </div> 
                                    )
                                    }
                                    
                                </div><br></br>
                                
                                
                                <div className="mb-4">
                                {/* <pre>{JSON.stringify(dataStore, null, 2) }</pre> */}
                                  <br></br>
                                    <a className="btn btn-primary mr-1" onClick={handleClick}>Add to cart</a>
                                </div>
                                </center>
                            </article> 
                        </main>
                    </div>  
        </article>
        <article className="card mt-5">
            
                
                <p>
                <center>
                  <h4><br></br>
                    Menu</h4>
                    </center>
                    <div>
      {/* <h2>Menu</h2> */}
      
      <ul>
        {menu &&
          Object.keys(menu).map((key) => (
            <li key={key}>
              {key}: {menu[key]}
            </li>
          ))}
      </ul>
    </div>
                </p>
        </article>
        </div>   
    </section>
    </div>
    );


  
} 



export default TiffinVendorDetails;