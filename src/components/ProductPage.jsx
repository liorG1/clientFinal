import {Box,Card, CardHeader, CardBody, CardFooter, useStatStyles,Stack,Heading,Text,Divider,ButtonGroup,Button,Image } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import Footer from './footer'
import { useToast } from '@chakra-ui/react'


export default function ProductPage (){
    const toast = useToast()
    const name=useParams('name').name
    const [data,setData]=useState([])
    const [loading,setLoading]=useState()
    const [cookies, setCookie] = useCookies(['token']);
    const [Login,setLogin]=useState(false)
    const [id,setId]=useState()
    const url=`https://server-spuh.onrender.com/products/ByName/${name}`
    const fetch=async()=>{
      if (cookies.token){
        setLogin(true)
      }
        const product=await axios.get(url)
        console.log(product.data.product);
        setId(product.data.product.id)
        return product.data.product
    }
    useEffect(()=>{
      fetch().then(product=>{
        setData(product)
        setLoading(true)
      })
    },[loading])


    const addToCart=()=>{
      let items=localStorage.getItem('id')?[ localStorage.getItem('id')]:[]
      console.log(`id : ${id}`);
      items.push(id)
      localStorage.setItem('id',items)
      toast({
        title: 'Success Login.',
        description: `Success add to shopping card`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      } 
    return (
<Box display={'flex'} height={'80%'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} >
{
    data&&data.map(product=>{return(
<Card maxW='sm' key={product.id} >
  <CardBody key={product.id} >
    <Image key={product.img}
      src={product.img}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3' key={product.id}>
      <Heading key={product.id} size='md'>{product.name}</Heading>
      <Text>
        This sofa is perfect for modern tropical spaces, baroque inspired
        spaces, earthy toned spaces and for people who love a chic design with a
        sprinkle of vintage design.
      </Text>
      <Text>catagory: {product.catagory}</Text>
      <Text color='blue.600' fontSize='2xl'>
        $450
      </Text>
    </Stack>
  </CardBody>
  <Divider key={product.id} />
  <CardFooter key={product.id}>
    <ButtonGroup spacing='2' key={product.id}>
      {
      Login&&
      <Button    variant='solid' colorScheme='blue' onClick={addToCart} >
        Add to cart
      </Button>
     }
    </ButtonGroup>
  </CardFooter>
</Card>
    ) })

}
<Footer ></Footer>

</Box>
    )
}