import { Box, Button, Input,InputGroup ,InputLeftAddon} from '@chakra-ui/react'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Footer from './footer'

import { useToast } from '@chakra-ui/react'


export default function Registrate(){
    const [userDetails,setDetails]=useState({
        name:undefined,
        email:undefined,
        password:undefined,
        city:undefined,
        country:undefined,
        streetAndApartment:undefined,
        phone_number:undefined
    })

    const [success,setSuccess]=useState(null)
    const [err,setError]=useState(null)
    const addDetail=(e)=>{
        console.log(e.target.name);
        setDetails({...userDetails,[e.target.name]:e.target.value})
        console.log(userDetails);
    }

    

    const submit= async(e)=>{
        e.preventDefault();
        if (!validEmail){
            console.log('cant registrate');
            return 'cant registrate'
            
        }
        else{

            try {
                const response=await axios.post(
                    "https://server-spuh.onrender.com/users/registrate",
                    userDetails,
                    {
                       headers :{"Content-Type":"application/json"},
                    }
                )
                console.log(response);
                if( response.data.success){
                    setSuccess(true)
                    toast({
                        title: 'Account created.',
                        description: "We've created your account for you.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                      })
                }
                else{
                    setSuccess(false)
                    setError(response.data.message)
                    toast({
                        title: 'Falied Registrate',
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
                    title: 'Falied Registrate',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            }
        }
        }

        const toast = useToast()

        const [validEmail,setValidEmail]=useState()

        function ValidateEmail(inputText)
                {
                var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if(inputText.value.match(mailformat))
                {
                alert("Valid email address!");
                setValidEmail(true)
                return true;
                }
                else
                {
                alert("You have entered an invalid email address!");
                setValidEmail(false)
                return false;
                }
                }


    return(
        <>
        
        <Box as={"form"} borderRadius={'20px'} bg={'#CBB26A'} margin={'5%'} padding={'5%'}>
            <div style={{color:"red",fontSize:"2em"}}>registrate page</div>
        <FormControl id='name' >
        <FormLabel htmlFor='name' required>full name</FormLabel>
        <Input name='name' required type='text' onChange={addDetail} />
        </FormControl>

        <FormControl id='email' >
        <FormLabel htmlFor='email' required> email</FormLabel>
        <Input id='email' name='email' required type='email' onChange={addDetail} />
        </FormControl>
        {

        }

        <FormControl id='password' >
        <FormLabel htmlFor='password' required>password</FormLabel>
        <Input name='password'  required type='password' onChange={addDetail} />
        </FormControl>

        <FormControl id='address' >
        <FormLabel htmlFor='country' required> country</FormLabel>
        <Input name='country' required  onChange={addDetail} />

        <FormLabel htmlFor='city' required> city</FormLabel>
        <Input name='city' required  onChange={addDetail} />

        <FormLabel htmlFor='street& aprtment' required> street & aprtment</FormLabel>
        <Input name='streetAndApartment' required  onChange={addDetail} />
        </FormControl>

        <FormControl id='phone_number' >
        <FormLabel htmlFor='phone_number' required>phone number</FormLabel>
        <InputGroup>
        <InputLeftAddon children='+972' />
        <Input name='phone_number'  type='tel'  onChange={addDetail} />
        </InputGroup>
        </FormControl>
        <Button type='submit' onClick={ ()=>{ValidateEmail(document.querySelector('#email'));submit}}    >click to submit</Button>

   {/*      {success&&<div>wellcome {userDetails.name}</div>}
        {success==false&&<div>registrate falild error: {err}</div>} */}
        </Box>
        <Footer></Footer>
        </>
    )
}
