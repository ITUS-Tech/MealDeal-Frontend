import React, { useState } from "react";
import FormInput from "../common/formInput";
import { useNavigate } from "react-router-dom";

function EditCustomerProfile(props) {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [phno, setPhno] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [user, setUser] = useState({});
  fetch("http://mealdeal.herokuapp.com/user/29")
    .then((response) => response.json())
    .then((data) => setUser(data));

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validateEmail = (email) => {
      // Regex to validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

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

    // Validate email
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // if (!address(address)) {
    //   setErrorMessage('Please enter your Address.');
    //   return;
    // }

    const formData = {
      fname,
      lname,
      phno,
      email,
      address,
      type,
      password,
    };

    try {
      await fetch(`http://mealdeal.herokuapp.com/29`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((response) => {
        if (response.ok) {
          navigate("/customerprofile");
        } else {
          setErrorMessage("Wrong with response!");
        }
      });
    } catch (error) {
      setErrorMessage("Something went wrong, please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <h3 className="mb-4">Edit Profile</h3>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <FormInput
                  value={fname}
                  type="text"
                  id="fname"
                  name={user.fname}
                  onChange={(event) => setFName(event.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <FormInput
                  value={lname}
                  type="text"
                  id="lname"
                  name={user.lname}
                  onChange={(event) => setLName(event.target.value)}
                  required
                />
              </div>
              <div className="col-md-12">
                <FormInput
                  value={address}
                  type="text"
                  id="address"
                  name={user.address}
                  onChange={(event) => setAddress(event.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <FormInput
                  value={phno}
                  type="text"
                  id="phno"
                  name={user.phno}
                  onChange={(event) => setPhno(event.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <FormInput
                  value={email}
                  type="email"
                  id="email"
                  name={user.email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCustomerProfile;
