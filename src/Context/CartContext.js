import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

let userToken = localStorage.getItem('userToken');
let currentCartID = localStorage.getItem('currentCartID');

let headers = {
    token : userToken
}

function addToCart(id){
    return axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`, 
    {
        productId:id
    },
    {
        headers
    }).then((response)=>response)
    .catch((error)=> error)
}

function getLoggedUserCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
    .then((response)=>response)
    .catch((error)=> error)
}

function removeCartItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {headers})
    .then((response)=>response)
    .catch((error)=> error)
}

function updateProductQuantity(productId, count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},{headers})
    .then((response)=>response)
    .catch((error)=> error)
}

function removeCartItems(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
    .then((response)=>response)
    .catch((error)=> error)
}

function onlinePayment(cartId,url,values){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    {
        shippingAddress:values
    },{headers})
    .then((response)=>response)
    .catch((error)=> error)
} 

export default function CartContextProvider(props){

    const [cartId, setCartId] = useState(null)

    useEffect(()=>{
        setCartId(currentCartID)
    }, [])

    return <CartContext.Provider value={{cartId,addToCart,getLoggedUserCart,removeCartItem,updateProductQuantity,removeCartItems,onlinePayment}}>
        {props.children}
    </CartContext.Provider>
}