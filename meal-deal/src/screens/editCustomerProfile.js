import React, { useState, useEffect } from "react";
import FormInput from "../common/formInput";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

function EditCustomerProfile(props){

    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [phno, setPhno] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [type, setType] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");   
    const {userId, isLoggedIn, isCustomer } = props.user();
    const [prices, setPrices]= useState({});
    const [vendorName, setVendorName]= useState("");
    const [vendorAddress, setVendorAddress]= useState("");
    const [image, setImage]= useState("");
    const [menu, setMenu]= useState("");
    const[dayPrice, setDayPrice]=useState(0)
    const[weekPrice, setWeekPrice]=useState(0)
    const[weekendPrice, setWeekendPrice]=useState(0)
    const[fortnightPrice, setFortnightPrice]=useState(0)
    const[monthPrice, setMonthPrice]=useState(0)


    useEffect(() => {
    fetch(`http://mealdeal.herokuapp.com/user/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      setFName(data.fname);
      setLName(data.lname);
      setPhno(data.phno);
      setEmail(data.email);
      setAddress(data.address);
      setType(data.type);
      setPassword(data.password);
    }).then(()=>{
      fetch(`http://mealdeal.herokuapp.com/vendor/${userId}`)
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      setVendorName(res.vendorName);
      setVendorAddress(res.address);
      setMenu(res.menu);
      setPrices(res.prices);
      setDayPrice(res.prices.Day);
      setWeekPrice(res.prices.Week);
      setWeekendPrice(res.prices.Weekend);
      setFortnightPrice(res.prices.Fortnight);
      setMonthPrice(res.prices.Month);
      setImage(res.image);
    });
    });


    }, [])

    let navigate = useNavigate();

    const handleSubmit = async () => {
    
        const validatePhone = (phno) => {
          // Regex to validate phone number format
          const phoneRegex = /^\d{10}$/;
          return phoneRegex.test(phno);
        };
    
        // Validate first name
        if (!fname) {
          setErrorMessage("Please enter your first name.");
          return;
        }
    
        // Validate last name
        if (!lname) {
          setErrorMessage("Please enter your last name.");
          return;
        }
    
        // Validate phone number
        if (!validatePhone(phno)) {
          setErrorMessage("Please enter a valid 10-digit phone number.");
          return;
        }
       
        // if (!address(address)) {
        //   setErrorMessage('Please enter your Address.');
        //   return;
        // }

        const formData = {
          id:userId,
          fname,
          lname,
          phno,
          email:email,
          address,
          type,
          password,
        };
        let newPrices={}
        if(dayPrice>0)
          newPrices.Day=dayPrice;
        if(weekPrice>0)
          newPrices.Week=weekPrice;
        if(weekendPrice>0)
          newPrices.Weekend=weekendPrice;
        if(fortnightPrice>0)
          newPrices.Fortnight=fortnightPrice;
        if(monthPrice>0)
          newPrices.Month=monthPrice;
        const vendor= {
          id:userId,
          image,
          vendorName,
          address: vendorAddress,
          menu,
          prices: newPrices
        }
    
        try {
          await fetch(`http://mealdeal.herokuapp.com/user/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((response) => {
              if (response.ok) {
              } else {
                setErrorMessage("Error");
              }
            });
        } catch (error) {
          setErrorMessage("Error1");
        }

        await fetch(`https://mealdeal.herokuapp.com/vendor/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vendor),
        }).then((response)=>navigate('/profile'));
      };

      const uploadImage= (event) =>{
        const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        setImage(reader.result);
      };
    }
  };

    return(
        <div className="container">
        <div className="col-sm-7 card p-4">
        <form onSubmit={handleSubmit}>
              <h5 className="card-title text-center">Edit Profile</h5>
              <FormInput
                value={fname}
                type="text"
                id="fname"
                name="First Name"
                onChange={(event) => setFName(event.target.value)}
                required
              />
              <FormInput
                value={lname}
                type="text"
                id="lname"
                name="Last Name"
                onChange={(event) => setLName(event.target.value)}
                required
              />
              <FormInput
                value={phno}
                type="text"
                id="phno"
                name="Phone"
                onChange={(event) => setPhno(event.target.value)}
                required
              />
              <FormInput
                value={address}
                type="text"
                id="address"
                name="Address"
                onChange={(event) => setAddress(event.target.value)}
                required
              />
              {errorMessage && <div>{errorMessage}</div>}
              </form>
              { !isCustomer &&(
                <form onSubmit={handleSubmit}>
                      <h5 className="card-title text-center">Vendor Details</h5>
                      <FormInput
                        value={vendorName}
                        type="text"
                        id="vendorName"
                        name="Vendor Name"
                        onChange={(event) => setVendorName(event.target.value)}
                        required
                      />
                      <FormInput
                        value={vendorAddress}
                        type="text"
                        id="vendorAddress"
                        name="Vendor Address"
                        onChange={(event) => setVendorAddress(event.target.value)}
                        required
                      />
                      <textarea
                        id="menu"
                        name="Menu"
                        type="textarea"
                        rows="7"
                        cols="93"
                        value={menu}
                        // className="form-control mb-2"
                        placeholder={menu}
                        onChange={(event) => setMenu(event.target.value)}
                        >
                      </textarea>
                      {/* <FormInput
                        value={menu}
                        type="textarea"
                        rows={5}
                        id="phno"
                        name={menu}
                        onChange={(event) => setMenu(event.target.value)}
                        required
                      /> */}
                      <FormInput
                        type="file"
                        id= "image"
                        name= "Image"
                        onChange={(event)=>uploadImage(event)}
                      />
                      <br/>
                      <br/>
                      <h6>Set Prices for your type of subcriptions</h6>
                      <label for="day">Day</label>
                      <FormInput
                        type="text"
                        value={dayPrice}
                        id="day"
                        name={dayPrice}
                        onChange={(event) => setDayPrice(event.target.value)}
                        />
                        <label for="week">Week</label>
                        <FormInput
                        type="text"
                        value={weekPrice}
                        id="week"
                        name={weekPrice}
                        onChange={(event) => setWeekPrice(event.target.value)}
                        />
                        <label for="weekend">Weekend</label>
                        <FormInput
                        type="text"
                        value={weekendPrice}
                        id="weekend"
                        name={weekendPrice}
                        onChange={(event) => setWeekendPrice(event.target.value)}
                        />
                        <label for="fortnight">Fortnight</label>
                        <FormInput
                        type="text"
                        value={fortnightPrice}
                        id="fortnight"
                        name={fortnightPrice}
                        onChange={(event) => setFortnightPrice(event.target.value)}
                        />
                        <label for="month">Month</label>
                      <FormInput
                        type="text"
                        value={monthPrice}
                        id="month"
                        name={monthPrice}
                        onChange={(event) => setMonthPrice(event.target.value)}
                        />
                      
                      {errorMessage && <div>{errorMessage}</div>}
                      </form>
                      
              )}
              <br/>
              <Button className="btn btn-primary" onClick={handleSubmit} >
                Save
              </Button>
              </div>
              </div>
    );
}

export default EditCustomerProfile;