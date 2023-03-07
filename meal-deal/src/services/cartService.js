import axios from "../services/axios";

export async function getCart(userId){
    try{
        const res= await axios.get(`http://localhost:8080/cart/${userId}`);
        return res.data;
    } catch (ex){
        console.log(ex);
        return null;
    }
}

export async function resetCart(userId){
    try{
        const res= await axios.put(`http://localhost:8080/cart/reset/${userId}`);
        console.log(res);
    } catch (ex){
        console.log(ex);
    }
}