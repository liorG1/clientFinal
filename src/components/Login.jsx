import { Box, Input,Text } from '@chakra-ui/react'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import Footer from './footer'

import { useToast } from '@chakra-ui/react'



export default function Login(){

    const toast = useToast()

    const [userDetails,setDetails]=useState({
        name:'',
        email:'',
        password:''
    })

    const [success,setSuccess]=useState(null)
    const [err,setError]=useState(null)

    const [cookies, setCookie] = useCookies(['token']);

    const addDetail=(e)=>{
        console.log(e.target.name);
        setDetails({...userDetails,[e.target.name]:e.target.value})
        console.log(userDetails);
    }



    const login= async(e)=>{
        e.preventDefault();


        try {
            
            const response=await axios.post(
                "https://server-spuh.onrender.com/users/login",
                userDetails,
                {
                   headers :{"Content-Type":"application/json"},
                }
            )
            console.log('response');
            console.log(response);
            setCookie('token',response.data.token)
            
            if( response.data.success){
                setSuccess(true)
                localStorage.setItem('user name',userDetails.name)
                toast({
                    title: 'Success Login.',
                    description: `Wellcome ${userDetails.name}`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })

             location.assign('/home') 
            }
            else{
                setSuccess(false)
                toast({
                    title: 'Failed Login.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
             
            }
        } catch (error) {
            console.log(error);
            setSuccess(false)
            setError(error.response.data.err)
            toast({
                title: 'Failed Login.',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
        }
    return(
        <>
        
        
        <Box as={"form"} borderRadius={'20px'} bg={'#CBB26A'} margin={'5%'} padding={'5%'} >
            <div style={{color:"black",fontSize:"2em"}}>Login page</div>
        <FormControl id='name' >
        <FormLabel htmlFor='name' required>full name</FormLabel>
        <Input name='name' required type='text' onChange={addDetail} />
        </FormControl>

        <FormControl id='email' >
        <FormLabel htmlFor='email' required> email</FormLabel>
        <Input name='email' required type='email' onChange={addDetail} />
        </FormControl>

        <FormControl id='password' >
        <FormLabel htmlFor='password' required>password</FormLabel>
        <Input name='password' required type='password' onChange={addDetail} />
        </FormControl>

        <button type='submit' onClick={login} >click to login</button>
<Text>Don't have acoount yet? click <Link to='/Registrate'>here to regisrtate</Link></Text>

      
        </Box>
        <Footer></Footer>
        </>
    )
}

