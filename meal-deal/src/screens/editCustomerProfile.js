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
    const [vendorDetails, setVendorDetails] = useState({});
    const [prices, setPrices]= useState({});
    const [vendorName, setVendorName]= useState("");
    const [vendorAddress, setVendorAddress]= useState("");
    const [image, setImage]= useState("");
    const [menu, setMenu]= useState("");

    const[day, setDay]=useState(false)
    const[week, setWeek]=useState(false)
    const[weekend, setWeekend]=useState(false)
    const[fortnight, setFortnight]=useState(false)
    const[month, setMonth]=useState(false)

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
    });

    fetch(`http://mealdeal.herokuapp.com/vendor/${userId}`)
    .then((response) => response.json())
    .then((res) => {
      setVendorName(res.vendorName);
      setVendorAddress(res.address);
      setImage(res.image);
      setMenu(res.menu);
      setPrices(res.prices);
      for(const key in prices){
        console.log(prices[key]);

      }
    });

    }, [])

    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
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
                navigate('/customerprofile')
              } else {
                setErrorMessage("Error");
              }
            });
        } catch (error) {
          setErrorMessage("Error1");
        }
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
                name={fname}
                onChange={(event) => setFName(event.target.value)}
                required
              />
              <FormInput
                value={lname}
                type="text"
                id="lname"
                name={lname}
                onChange={(event) => setLName(event.target.value)}
                required
              />
              <FormInput
                value={phno}
                type="text"
                id="phno"
                name={phno}
                onChange={(event) => setPhno(event.target.value)}
                required
              />
              <FormInput
                value={address}
                type="text"
                id="address"
                name={address}
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
                        name={vendorName}
                        onChange={(event) => setVendorName(event.target.value)}
                        required
                      />
                      <FormInput
                        value={vendorAddress}
                        type="text"
                        id="vendorAddress"
                        name={vendorAddress}
                        onChange={(event) => setVendorAddress(event.target.value)}
                        required
                      />
                      <textarea
                        id="menu"
                        name={menu}
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
                        name= {image}
                        onChange={(event)=>uploadImage(event)}
                      />
                      <table>
                        <tr>
                        {Object.keys(prices).map((key) => (
                          <>
                        <td>
                      <label for={key}>{key}</label>
                      <input
                        type="checkbox"
                        id={key}
                        name="price"
                        value={key}
                      />
                      </td>
                      <td>
                        <input type="text"/>
                      </td>
                      </>
                      ))}
                        </tr>
                      </table>
                      
                      {errorMessage && <div>{errorMessage}</div>}
                      </form>
                      
              )}
              <br/>
              <Button className="btn btn-primary" type="submit" >
                Save
              </Button>
              </div>
              </div>
    );
}

export default EditCustomerProfile;