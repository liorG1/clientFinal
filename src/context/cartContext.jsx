/* import { JSON } from "mysql/lib/protocol/constants/types"; */ 
import { createContext, useEffect, useState } from "react";

export const CartContext=createContext()
export const CurrentProduct=createContext()

export default function CartProvider({children}){
    const [cartItems,setCart]=useState([])
    const value={
        cartItems,
        setCart
    }

    const [currentItem,setCurrent]=useState()
    const Current={currentItem,setCurrent}

    //כל פעם שהספק יתרנדר הוא יוודא שכל מה שבלוקל סטורז עובר אל המשתנה קארט אייטמז
    useEffect(()=>{
        const storedCartItems=localStorage.getItem('cart')
        if (storedCartItems){
            setCart(JSON.parse(storedCartItems))
        }  
    },[])

    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cartItems))
    },[cartItems])

    useEffect(()=>{
localStorage.setItem('current',currentItem)
console.log('look at local storage');
    },[currentItem])
    return <CartContext.Provider value={value}>
                <CurrentProduct.Provider value={Current}>

        {children}
                </CurrentProduct.Provider>
        
        </CartContext.Provider>
}