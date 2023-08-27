import {Select,Input, Image,Button,Text,Heading,Stack, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState ,useContext} from 'react'
/* import { CartContext, CurrentProduct } from '../context/cartContext' */
import { useParams } from 'react-router-dom'
import Footer from './footer'

export default function ProductById(){
    const {id}=useParams()
    const [data,setData]=useState()
    const [loading,setLoading]=useState()
    const [BuyingDetails,setDetaile]=useState({size:null,total_price:null})
    const url=`http://localhost:3000/products/ById/${id}`
    const fetch=async()=>{
        try {
            const response=await axios.get(url)
            return response
        } catch (error) {
            console.log(error)
        } 
    }
    useEffect(()=>{
        fetch().then(pro=>{setData(pro.data.product);setLoading(true);})
    },[loading])

    console.log( localStorage.getItem('id')&&localStorage.getItem('id').split(','));
    const addToCart=()=>{
    let items=localStorage.getItem('id')?[ localStorage.getItem('id')]:[]
    items.push(id)
    localStorage.setItem('id',items)
    } 
    
    return(
        <>
        {
            data&&<Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
          >
            <Image
              objectFit='cover'
              maxW={{ base: '100%', sm: '200px' }}
              src={data.img}
              alt={data.name}
            />
          
            <Stack>
              <CardBody>
                <Heading size='md'>{data.name}</Heading>
          <Text>price : {data.price}$</Text>
                <Text py='2'>
                  Caffè latte is a coffee beverage of Italian origin made with espresso
                  and steamed milk.
                </Text>
                <Text>catagory: {data.catagory}</Text>

                <Select placeholder='Size' id='size' onChange={(e)=>{setDetaile({...BuyingDetails,size:e.target.value})} }>
  <option value={42}>42</option>
  <option value={43}>43</option>
  <option value={44}>44</option>
  <option value={45}>45</option>
  <option value={46}>46</option>
</Select>



              </CardBody>
          
              <CardFooter>
                
                <Button variant='solid' colorScheme='blue'  onClick={addToCart}  >
                  add to cart
                </Button>
              </CardFooter>
            </Stack>
          </Card> 
        }
        <Footer></Footer>
        </>
    )
}