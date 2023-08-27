import { Input,Box ,Checkbox,Text,Spinner,Flex,Grid,useDisclosure} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { Card, CardHeader, CardBody, CardFooter,Stack,Heading,Divider,ButtonGroup,Button,Image } from '@chakra-ui/react'
import {SearchIcon,ArrowLeftIcon,ArrowRightIcon} from '@chakra-ui/icons'
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import Footer from "./footer";
import { useCookies } from 'react-cookie';

export default function AllProducts(){

    const [data,setData]=useState([])
    const [cookies, setCookie] = useCookies(['token']);
    const [loading,setLoading]=useState(true)
    const [Login,setLogin]=useState(false)

    const fetch=async()=>{
        const response=axios.get('http://localhost:3000/products/all')
        if (cookies.token){
            setLogin(true)
          }
        return response
    }

    useEffect(()=>{
        fetch().then(pro=>{setData(pro.data);setLoading(false);})
    },[])

    useEffect(()=>{
        console.log('data');
        console.log( data);
    },[data])

    const main_box={
        display:'flex',
        flexDirection:['column','row'],
        justifyContent:'space-around',
        alignItems:['center','initial'],
        width:'100%',
        marginTop:'5%'
    }

    const checkbox_style={
        
        width:'100%',
        display:'flex',
        flexDirection:'column',
        height:'max-content',
       marginBottom:'10%'
    }

    const logInput=()=>{
        console.log(document.querySelector('input').value);
        const name=document.querySelector('input').value
        location.assign(`/products/byName/${name}`)
      }


      let [currentPage,setCurrentPage]=useState(1)
      let [firstProduct,setFirstProduct]=useState(-6)
      let [lastProduct,setLastProduct]=useState(0)
      let [PageUp,setPage]=useState(true)

      const PreviousPage=()=>{
          setCurrentPage(currentPage--) 
          setPage(false) 
      }

      const NextPage=()=>{
          setCurrentPage(currentPage++)
          setPage(true)
      }


        useEffect(()=>{
            console.log(`change: ${currentPage}`);
            if (PageUp){
                setFirstProduct(firstProduct+6)
                setLastProduct(lastProduct+6)
              /*   console.log('page up');
                console.log(`first page :${firstProduct},last product ${lastProduct}`); */
            }
            if (!PageUp){
                setFirstProduct(firstProduct-6)
                setLastProduct(lastProduct-6)
             /*    console.log('page down');
                console.log(`first page :${firstProduct},last product ${lastProduct}`); */
            }
        },[currentPage])
            
/* console.log(`first ${firstProduct} last: ${lastProduct}`); */

        const [brands,setBrands]=useState([])
        const [catagories,setCatagories]=useState([])
        const SearchByBrand=(e)=>{
            const brand=e.target.value
            if (brands.includes(brand)){
                console.log('includs');
               const newBrands= brands.filter((br)=>{return br!==brand})
                setBrands(newBrands)
            }
            else{
                console.log('not includ');
                setBrands((pervBrands)=>[...pervBrands,brand])
               
            }
        }

            useEffect(()=>{
                console.log(brands);
            },[brands])

            const SearchByCatagory=(e)=>{
                const catagory=e.target.value
                if (catagories.includes(catagory)){
                    console.log('include');
                    const newCatagoreis=catagories.filter((catag)=>{return catag!==catagory})
                    setCatagories(newCatagoreis)
                }
                else{
                    console.log('not include');
                    setCatagories((pervCatagory)=>[...pervCatagory,catagory])
                }
            }
            
            useEffect(()=>{
                console.log(catagories);
            },[catagories])
        
    return(
<Box  >
                    <Flex marginLeft={'25%'} w={'50%'}>
                  <SearchIcon onClick={logInput}  h={'100%'} style={{color:'white'}}></SearchIcon>
                  <Input  w={'100%'} style={{color:'white'}}  placeholder="enter product name"/> 
                 </Flex>
        <Box sx={main_box}>
<Box backgroundColor={'white'} borderRadius={'20px'} padding={'20px'} height={'max-content'}>


            <Box     sx={checkbox_style}>
                <Text fontSize={'2em'} fontWeight={'bold'}>brand:</Text>
                <Checkbox  onChange={SearchByBrand} value={'nike'}>nike</Checkbox>
                <Checkbox onChange={SearchByBrand} value={'adidas'}>adidas</Checkbox>
                <Checkbox onChange={SearchByBrand} value={'puma'}>puma</Checkbox>
            </Box>

            <Box   sx={checkbox_style}>
                <Text fontSize={'2em'} fontWeight={'bold'}>catagory:</Text>
                <Checkbox onChange={SearchByCatagory} value={'sport'}>sport</Checkbox>
                <Checkbox onChange={SearchByCatagory} value={'fashion'}>fashion</Checkbox>
                <Checkbox onChange={SearchByCatagory} value={'snikers'}>snikers</Checkbox>
            </Box>
            </Box>
            <Box  width={['70%']} >
                {loading==true&& <Spinner/>}
                <Grid height={['500vh','100vh']}   templateColumns={['repeat(1,1fr)','repeat(2,1fr)','repeat(3,1fr)']} templateRows={'repeat(2,1fr)'} rowGap={'5%'}>
{data&&data .filter((pro)=>{ if(brands.length>0){return brands.includes(pro.brand)} else return pro}) .filter((pro)=>{ if(catagories.length>0){return catagories.includes(pro.catagory)} else return pro}).slice(firstProduct,lastProduct).map(pro=>{
    return(
        <Card height={['max-content','100%']} maxW={['70%','40%']} >
                                <CardBody>
                                    <Image
                                    src={pro.img}
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'
                                    />
                                    <Stack mt='6' spacing='3'>
                                    <Heading size='md'>{pro.name}</Heading>
                                    
                                    <Text color='blue.600' fontSize='2xl'>
                                        {pro.price}
                                    </Text>
                                    </Stack>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <ButtonGroup >
                                   
                                    {
      Login&&
      <Button    variant='solid' colorScheme='blue' onClick={()=>{location.assign(`/products/byId/${pro._id}`)}}>
        Add to cart
      </Button>
     }
                                    </ButtonGroup>
                                </CardFooter>
                </Card>



    )
})
                    
}
                </Grid>
<Box margin={['50px']} display={'block'}>
    {
        currentPage>1&&<Button onClick={PreviousPage} backgroundColor={'transparent'}><ArrowLeftIcon  color={'white'}></ArrowLeftIcon></Button>
    }
<Button >{currentPage}</Button>
<Button onClick={NextPage}  backgroundColor={'transparent'}><ArrowRightIcon  color={'white'}></ArrowRightIcon></Button>

    </Box>            
            </Box>

        
        </Box>

    <Footer></Footer>   
    </Box>
    

    )

}