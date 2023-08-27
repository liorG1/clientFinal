import { Flex, Grid,GridItem,Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer=()=>{
const Footer_style={
    width:'100vw',
    backgroundColor:'#CBB26A',
    justifyContent:'space-evenly',
    color:'black'
}

    return(
<Flex sx={Footer_style} >
    <Text >@ all rights to Style Shoes</Text>
    <Flex  w={'40%'} justifyContent={'space-between'}>
        <Link   to="/home" >home</Link>
        <Link  to="/about" >about</Link>
        <Link  to="/contact" >contact</Link>   
    </Flex>
</Flex>
        
    )
}

export default Footer