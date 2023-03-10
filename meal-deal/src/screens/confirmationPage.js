import React, { useState, useEffect } from "react";
// import { getCart } from "../services/cartService";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function ConfirmPage(props) {
    const navigate = useNavigate(); 
    const [cart, setCart] = useState({});
    const [items, setItems] = useState([]);
    const params = useParams();

    return(
        <h1>Order Confirmed!!</h1>
    );
};

export default ConfirmPage;