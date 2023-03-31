import React, { useState, useEffect } from "react";
import FormInput from "../common/formInput";
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

    return(
        <div className="container">
        <div className="col-lg-3 col-md-3 col-sm-3 card p-4">
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
              <button className="btn btn-primary d-flex" type="submit">
                Save
              </button>
              </form>
              </div>
              </div>
    );
}

export default EditCustomerProfile;