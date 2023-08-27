import { Box, Input } from '@chakra-ui/react'

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
                "http://localhost:3000/users/login",
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

            /* location.href='http://localhost:5173/user' */
            }
            else{
                setSuccess(false)
                toast({
                    title: 'Failed Login.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
                /* setError(response.err) */
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

       {/*  {success&&<div>wellcome {userDetails.name}</div>}
        {success==false&&<div>login falild error: {err}</div>} */}
      {/*   {success&&<Link to={'http://localhost:5173/allProducts'}></Link>} */}
      
        </Box>
        <Footer></Footer>
        </>
    )
}

