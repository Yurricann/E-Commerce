import axios from "axios";
import { createContext } from "react";

export let WishContext = createContext();
let userToken = localStorage.getItem('userToken');
let headers = {
    token : userToken
}

function addToWish(id){
    return axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`, 
    {
        productId:id
    },
    {
        headers
    }).then((response)=>response)
    .catch((error)=> error)
}

function getLoggedUserWishList(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {headers})
    .then((response)=>response)
    .catch((error)=> error)
}

function removeItemWish(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , {headers})
    .then((response)=>response)
    .catch((error)=> error)
}


export default function WishListContextProvider(props){


    return <WishContext.Provider value={{addToWish,getLoggedUserWishList,removeItemWish}}>
        {props.children}
    </WishContext.Provider>
}