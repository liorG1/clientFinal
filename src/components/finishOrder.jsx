import { Box, Button, Input,InputGroup ,InputLeftAddon,Spinner} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useCookies } from 'react-cookie';
import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
  } from '@chakra-ui/react'
//import { json } from 'react-router-dom'
//import { STRING } from 'mysql/lib/protocol/constants/types'



/////////////////////////////////////
//adress
function FirstStepContent(props){
    const [userDetails,setDetails]=useState(true)
    const [cookies, setCookie] = useCookies(['token']);
    const [data,setData]=useState()
    const [loading,setLoading]=useState(false)

    const token=cookies.token
       const UserDetailes=async()=>{
        try {
          return await axios.get(`https://server-spuh.onrender.com/users/getUser/${token}`)
        } catch (error) {
          console.log(error);
        }
            }
    useEffect(()=>{
      UserDetailes().then(response=>{setData( response.data.userDetalis);console.log(data);})
    },[data!=undefined]) 
   
    const toggle=()=>{
        setDetails(!userDetails)
        console.log(userDetails);
    }

    const next=props.next
    return (
        <Box  bg={'#CBB26A'}>
        <h1>Address detalis</h1>
        <Checkbox defaultChecked={false} onChange={()=>{toggle()}}>Originaks detailes:</Checkbox>
        {
            userDetails?<FormControl isRequired>
            <FormLabel >Country</FormLabel>
            <Input id='Country' />
            <FormLabel>City</FormLabel>
            <Input  />
            <FormLabel>Street & apartment</FormLabel>
            <Input  />
          </FormControl>:
          <FormControl>
          <FormLabel>Country</FormLabel>
          <Input isDisabled    placeholder={`${data.country}`}    />
          <FormLabel>City</FormLabel>
          <Input isDisabled    placeholder={`${(data.city)}`}  />
          <FormLabel>Street & apartment</FormLabel>
          <Input isDisabled   placeholder={`${data.streetAndApartment}`}  />
        </FormControl>
        }

<Button onClick={()=>{next(2)}}>next</Button>
                </Box>
            
        
    )
}




//////////////////////////////////////////////////
//peyment 
function SecondStepContent(props){
   

    const next=props.next
   
    
    return (
        <Box  bg={'#CBB26A'}>
        <h1>Peyment detalis</h1>
       
        {
            <FormControl isRequired>
            <FormLabel >Crad number</FormLabel>
            <Input type='number' />
            <FormLabel>Exp date</FormLabel>
            <Input type='date' />
            <FormLabel>CCV</FormLabel>
            <Input type='number' />
          </FormControl>
        }

        <Button onClick={()=>{next(3)}}>next</Button>
                </Box>
            
        
    )
}

 function ThirdStepContent (){

   const [send,setSentStatus]=useState()
  const [newOrder,setnewOrder]=useState()
  const [cookies, setCookie] = useCookies(['token']);
  const [success,setSuccess]=useState()
  const token=cookies.token
  const url='https://server-spuh.onrender.com/orders/add'
  const products=localStorage.getItem('id').split(',')
  const total_price=localStorage.getItem('total_price')
  console.log(products);
  const [loading,setLoading]=useState(true)

 const fetch=async()=>{
  const response=await axios.post(url,{token,products:products,total_price:total_price})
  return response
 }

 const sendMail=async()=>{
  if(newOrder){

    const response= await axios.post('https://server-spuh.onrender.com/orders/getBill',{
      order:newOrder
      })
      console.log('response');
      console.log(newOrder);
  
      return response
  }
 }

 useEffect(()=>{
  fetch().then(msg=>{
    console.log(msg.data.newOrder);
    setnewOrder(msg.data.newOrder)
    console.log('new order');
    console.log(newOrder);
    console.log(msg.data.success);
  })
 },[])

 useEffect(()=>{
  sendMail().then(response=>{
    console.log(response);
    setSuccess(true)
    setLoading(false)
  }).catch(response=>{
    console.log(response);
   setSuccess(true)
    
  })
 },[newOrder])





    return(
        loading?<Spinner/>:
        
        success?<><Text color={'#CBB26A'}>congratulations </Text><Text color={'#CBB26A'}>your order complete, check your email box for bill</Text></>:
        <Text color={'#CBB26A'}>failed to complete order</Text>
      
       
    )
}



export default function FinishOrder(){
    const steps = [
        { title: 'First', description: 'Adress',content:<FirstStepContent/> },
        { title: 'Second', description: 'peyment'/* , content:<SecondStepContent/> */},
        { title: 'Third', description: 'Select Rooms'/* ,content:<ThirdStepContent/> */},
      ]

        const { activeStep, setActiveStep } = useSteps({
          index: 1,
          count: steps.length,
        })
      
        return (
            <>
         
          <Stepper size='lg' index={activeStep}>
            {steps.map((step, index) => (
              <Step key={index} onClick={() => setActiveStep(index)}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
      
                <Box flexShrink='0'>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>
                
                <StepSeparator />
              </Step>
              
              
            ))}
            
          </Stepper>

          
             {
                activeStep==1?<><FirstStepContent next={setActiveStep}/>{/* <Button onClick={()=>{setActiveStep(2)}}>next</Button> */}</>:
               activeStep==2?<SecondStepContent next={setActiveStep}/>:
               <ThirdStepContent/>

             }

</>

        )
     
}







