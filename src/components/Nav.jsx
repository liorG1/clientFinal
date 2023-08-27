import { Button, Flex,Image,Input ,Grid, background,Text} from "@chakra-ui/react";
import { useState,useContext } from "react";
import { FaHamburger } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { useCookies } from "react-cookie";
import {SearchIcon} from '@chakra-ui/icons'
import { color } from "framer-motion";
import Cart from "./cart";


import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal
} from '@chakra-ui/react'


function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [userLoginOption,setLoginOption]=useState(false)
  const [cookie]=useCookies(['token'])
  const [userLog,setUserLog]=useState(false)
  const userName=localStorage.getItem('user name');
  const [cookies, setCookie,removeCookie] = useCookies(['token']);

  const nav_styles = {
    display: 'flex',
   /*  backgroundColor:'white', */
    justifyContent:'space-around',
    borderRadius:'10px',
    width:'100%',
  };

  const button_styles = {
    top: [2, 1],
    left: 5,
    display: ["inherit", "none"],
   
  };

  const Link_styles={
    color:'#CBB26A',
    backgroundColor:'transparent',
    fontSize:'2em',
    _hover:{
      backgroundColor:'#CBB26A',
      color:'black',
    }
  }

  


  const changeOpen = () => {
    setIsOpen(!isOpen);
  };

  const openLoginOption=()=>{
    setLoginOption(!userLoginOption)
    console.log(`token: ${cookie.token?true:false}`);
    setUserLog(cookie.token?true:false)
    console.log(`user name : ${userName}`);
  }

/*   const logInput=()=>{
    console.log(document.querySelector('input').value);
    const brand=document.querySelector('input').value
    location.assign(`/products/brand/${brand}`)
  }
 */
  return (
    <div style={{'display':'flex','flexDirection':'column','backgroundColor':'black','align-items':'center'}}>
    <Image w={['80%','30%']} borderRadius={'20px'} src="/logo.png"></Image>
      <Flex justifyContent={'center'} alignItems={'center'} direction={["column", "row"]} sx={nav_styles}>

      <Popover>
  <PopoverTrigger>
  <Avatar bg={'#CBB26A'} src='https://bit.ly/broken-link' onClick={openLoginOption} />
  </PopoverTrigger>
  <Portal >
    <PopoverContent bg={'#CBB26A'}>
      <PopoverArrow />
      <PopoverHeader>Profile</PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
      {
        
        userLog?<><li>you connect as {userName}</li><Button backgroundColor={'transparent'} onClick={()=>{removeCookie('token');localStorage.removeItem('id');location.reload()} }color={'red'} >click to logout</Button></>
        :<>
        <Text>You not login</Text>
        <Text>to buy products you must login first</Text>
        <Flex flexDirection={'row'}><Link to="/Login"> <Button colorScheme='teal' >
        click to Login
      </Button></Link> <Link to="/registrate"> <Button colorScheme='orange' >
    Click to registrate
  </Button></Link> </Flex>
        </>
      }
      </PopoverBody>
   
    </PopoverContent>
  </Portal>
</Popover>





        <Link  to="/home" ><Button sx={Link_styles}>home</Button></Link>
        <Link to='/products'><Button sx={Link_styles}>Products</Button></Link>
        <Link to="/about" ><Button sx={Link_styles}>about</Button></Link>
        <Link to="/contact" ><Button sx={Link_styles}>contact</Button></Link>   
{/*         <Link to={'cart'} color="white" ><Image backgroundColor={'#CBB26A'} src="/cart.png"  alt="cart"></Image></Link> */}
<Cart></Cart>
     {/*    <Flex>
                  <SearchIcon onClick={logInput}  h={'100%'} style={{color:'white'}}></SearchIcon>
                  <Input  w={'min-content'} style={{color:'white'}}  placeholder="enter product name"/> 
        </Flex> */}
      </Flex>
    
    <Outlet/>
    </div>
  );
}

export default Nav;