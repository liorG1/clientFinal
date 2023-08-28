
import {StatHelpText, Text,Image,Box} from '@chakra-ui/react'
import { useContext } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import Footer from './footer'

export default function About(){

    const Box_style={
        
        display:'flex',
        flexDirection:['column','row'],
        justifyContent:'center',
        gap:[null,'40px'],
        marginBottom:'100px'
    }

    return (
        <>
        
        <video width={'100%'}  src='./video.mp4' autoPlay={true} loop={true}></video>
        <div style={{width:'100%',height:'50%',display:'flex',justifyContent:'center',alignItems:'center',position:'relative' ,top:'-100px'}}>
<div style={{backgroundColor:'#CBB26A',width:'90%',textAlign:'center',borderRadius:'20px'}}>

            <Text fontSize={['1.5em','2em']} fontWeight={'bold'} >Bring power to your steps.</Text>
            <Text fontSize={['1em','1.5em']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ex sint repellendus dolorum! Vitae quasi veniam repellendus, velit officiis vel molestiae, quisquam impedit temporibus dignissimos, molestias laboriosam officia ex distinctio?</Text>
</div>
        </div>


        <Box sx={Box_style}>
            <Image w={['100%','30%']} src='https://www.shutterstock.com/shutterstock/photos/1360189244/display_1500/stock-photo-man-using-credit-card-to-do-shopping-online-with-laptop-mature-man-buying-formal-shoes-online-man-1360189244.jpg'></Image>  
            <Text color={'#CBB26A'} textAlign={['start']} w={[null,'30%']} fontSize={['1em','1.5em']}><Text borderBottom={'2px'}  fontWeight={'bold'} fontSize={['1.5em','2em']}>Active life, active shoes</Text> Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat adipisci eos pariatur neque aut, enim rem repellat quos fuga praesentium nulla dicta eveniet, vero odit, doloremque hic ipsum alias consequuntur?</Text>
        </Box>

        <Box sx={Box_style}>
        <Text color={'#CBB26A'} textAlign={['start']} w={[null,'30%']} fontSize={['1em','1.5em']}><Text borderBottom={'2px'}  fontWeight={'bold'} fontSize={['1.5em','2em']}>Perfection in every shoe</Text> Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat adipisci eos pariatur neque aut, enim rem repellat quos fuga praesentium nulla dicta eveniet, vero odit, doloremque hic ipsum alias consequuntur?<Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptatem nisi rem eaque ipsa, quam temporibus corrupti nihil rerum sed itaque, nemo maiores. A, molestias! Molestias minus animi earum. Accusantium!</Text></Text>
        <Image src='https://neemans.com/cdn/shop/articles/ND_-_Blog_Tips_to_Buy_shoes_-_1600_x_1000_px_f_d5362666-5582-487c-bdd8-1c2c53740a72_600x600_crop_center.jpg?v=1624470193'></Image>
        </Box>


       <Footer/>
        </>
    )
}
