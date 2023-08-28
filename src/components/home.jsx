import {Box,Card, CardHeader, CardBody, CardFooter, useStatStyles,Stack,Heading,Text,Divider,ButtonGroup,Button,Image,Flex } from '@chakra-ui/react'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { CartContext, CurrentProduct } from '../context/cartContext'
import Carusel from './carusel'
import { useCookies } from 'react-cookie';
import Footer from './footer'



export default function Home(){
    const [data,setData]=useState()
    const [loading,setLoading]=useState()
    const {cartItems,setCart}=useContext(CartContext) 
    const [cookies, setCookie] = useCookies(['token']);
    const [Login,setLogin]=useState(false)
    const fetch=async()=>{
        try {
            const response=await axios.get('https://server-spuh.onrender.com/products/all')
            if (cookies.token){
              setLogin(true)
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetch().then(pro=>{setData(pro);setLoading(true)})
    },[loading])

    const {currentItem,setCurrent}=useContext(CurrentProduct)
    const displayProduct=(id)=>{
            /* const url ='http://'+ location.host+`/products/byId/${e.target.id}`
            location.assign(url) */

            const url='http://'+ location.host+`/product`
            console.log('id');
            console.log(id);
             setCurrent(id)
             console.log('current');
             console.log(currentItem);
              if (currentItem!=undefined){
               location.assign(url) 
             }

             
            }
            const home_pictures_style={
                width:'100vw',
                height:'60vh',
                background: 'url("https://p.turbosquid.com/ts-thumb/4L/Kl2b5M/Mu3mrytY/shoe01/jpg/1521606934/300x300/sharp_fit_q85/fe2270e8f4e2d309f547a93e17b3e8c3ef51b40e/shoe01.jpg")  ',
               backgroundSize:'cover',
               backgroundPositionY:'-250px'

           } 
    return(
      <>
<Flex flexDirection={'column'}  justifyContent={'center'} textColor={'#CBB26A'} sx={home_pictures_style}>
<Text  fontSize={'8.5rem'}>Start</Text>
<Text fontSize={'5rem'}>your day </Text>
<Text fontSize={'2rem'}>with our shoes</Text>
</Flex>
     
<Text as={'b'} color={'#CBB26A'} fontSize='50px'>our brands:</Text>
<Box w={'full'} display={'flex'} justifyContent={'center'}>
<Carusel/>
</Box>

<Box display={'flex'} flexDirection={['column','row']} gap={10}>


</Box>
<Footer></Footer>
</>
    )}
