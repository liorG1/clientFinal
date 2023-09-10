import {
    Select,
    Input,
    Image,
    Button,
    Text,
    Heading,
    Stack,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
  } from "@chakra-ui/react";
  import axios from "axios";
  import { useEffect, useState, useContext } from "react";
  import { CartContext, CurrentProduct } from "../context/cartContext";
  import { useParams } from "react-router-dom";

  export default function Spesific() {
    const {currentItem,setCurrent}=useContext(CurrentProduct) 
    const currentItemn=localStorage.getItem('current')
    const [data, setData] = useState();
    const [BuyingDetails, setDetaile] = useState({
      size: null,
      quntity: null,
      total_price: null,
    });
    const { cartItems, setCart } = useContext(CartContext);
  console.log('current');

 console.log(currentItemn);
  
    const url = `https://server-spuh.onrender.com/products/ById/${currentItemn}`;
    const fetch = async () => {
      try {
        const response = await axios.get(url);
        return response;
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      fetch().then((pro) => {
        setData(pro.data.product);
      });
    }, []);
        const addToCart=()=>{
          const item={
            currentItem,
            BuyingDetails
          }
          setCart(items=>[...items,item])
          console.log(cartItems);
          localStorage.setItem('cart',cartItems)
      }
  
    return (
      <>
        {data && (
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={data.img}
              alt={data.name}
            />
  
            <Stack>
              <CardBody>
                <Heading size="md">{data.name}</Heading>
                <Text>price : {data.price}$</Text>
                <Text py="2">
                  Caffè latte is a coffee beverage of Italian origin made with
                  espresso and steamed milk.
                </Text>
  
                <Select
                  placeholder="Size"
                  id="size"
                  onChange={(e) => {
                    setDetaile({ ...BuyingDetails, size: e.target.value });
                  }}
                >
                  <option value={42}>42</option>
                  <option value={43}>43</option>
                  <option value={44}>44</option>
                  <option value={45}>45</option>
                  <option value={46}>46</option>
                </Select>
  
                <Input
                  type="number"
                  placeholder="quntity"
                  onChange={(e) => {
                    setDetaile({
                      ...BuyingDetails,
                      quntity: e.target.value,
                      total_price: e.target.value * data.price,
                    });
                  }}
                />
              </CardBody>
  
              <CardFooter>
                <Button
                  variant="solid"
                  colorScheme="blue" onClick={addToCart}
                >
                  add to cart
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        )}
      </>
    );
  }
  