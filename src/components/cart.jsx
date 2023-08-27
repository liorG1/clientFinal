import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Image,
    Drawer,
    DrawerOverlay,
    DrawerContent,DrawerHeader,DrawerBody
  } from '@chakra-ui/react'

  import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import axios from 'axios'
import { DeleteIcon } from '@chakra-ui/icons'


import { useEffect, useState } from 'react'

export default function Cart(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data,setData]=useState()
    const [loading,setLoading]=useState()
    const url=`http://localhost:3000/products/ById/`
    const orderd_ids=localStorage.getItem('id')?localStorage.getItem('id').split(','):[]
   const ordered_products=[]
   let [totalPrice,setTotal]=useState(0)
   const updataPrice=(num)=>{
setTotal(totalPrice= totalPrice+num)
   }
    const fetch=async()=>{
      try {
        orderd_ids.map(async(id)=>{
            const response=await axios.get(`${url}${id}`)
            ordered_products.push(response)
            updataPrice(response.data.product.price)
        })
        
        return ordered_products
      } catch (error) {
        console.log(error);
      }
    }
    const deletFromCart=async(value)=>{
      const index=orderd_ids.indexOf(value)
         orderd_ids.splice(index,1)
        localStorage.setItem('id',orderd_ids.toString())
        location.reload() 
    }

    const FinishOrder=()=>{
      location.assign('/orders/finishOrder')
    }
   

    useEffect(()=>{
      fetch().then(product=>{
        setData(product)
        setLoading(true)
      })
    },[loading])

    useEffect(()=>{
      console.log(totalPrice);
      localStorage.setItem('total_price',totalPrice)
    },[totalPrice])

    return(
       /*  <>
        <Button onClick={onOpen}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>shpping cart</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <TableContainer>
  <Table variant='simple'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>

    <Tbody>
      {
         data&&data.map(element => {
        return(
         <Tr key={element}>
              <Td  key={element}>{element.data.product.name}</Td>
              <Td> <Image alt='product image' src={element.data.product.img} /> </Td>
              <Td>{element.data.product.price}</Td>
              <Td ><Button onClick={()=>{deletFromCart(element.data.product._id)}} colorScheme='blue'>Button</Button></Td>
         </Tr>
        )
      })
    }
    </Tbody>
    <Tfoot>
      {<Td>total price :{totalPrice}</Td>}
    </Tfoot>
  </Table>
</TableContainer>
            <TableContainer>
  <Table variant='simple'>
 
  </Table>
</TableContainer>




            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost' onClick={FinishOrder} >Finish order</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </> */
      <>
      <Button backgroundColor={'#CBB26A'} _hover={{backgroundColor:'#CBB26A'}} onClick={onOpen}><Image backgroundColor={'#CBB26A'} src="/cart.png"  alt="cart"></Image></Button>
      <Drawer  placement='right' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Shopping Cart</DrawerHeader>
          <DrawerBody>
          <TableContainer>
  <Table variant='simple'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>

    <Tbody>
      {
         data&&data.map(element => {
        return(
         <Tr key={element}>
              <Td  key={element}>{element.data.product.name}</Td>
              <Td> <Image alt='product image' src={element.data.product.img} /> </Td>
              <Td>{element.data.product.price}</Td>
              <Td ><Button onClick={()=>{deletFromCart(element.data.product._id)}} colorScheme='blue'><DeleteIcon></DeleteIcon></Button></Td>
         </Tr>
        )
      })
    }
    
    </Tbody>
    <Tfoot>
      {<Td>total price :{totalPrice}</Td>}
      {totalPrice>0&&<Button display={'block'} variant='ghost' onClick={FinishOrder} >Finish order</Button>}
    </Tfoot>
  </Table>
</TableContainer>
            <TableContainer>
  <Table variant='simple'>
 
  </Table>
</TableContainer>

          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
    )
}