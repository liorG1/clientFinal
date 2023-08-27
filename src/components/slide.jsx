import {Button,Slide,Box,Text, useDisclosure} from '@chakra-ui/react'

export default function SlideEx() {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <>
        <Button onClick={onToggle}>Click Me</Button>
        <Slide  in={isOpen} style={{ zIndex: 40 }}>
          <Box
            p='40px'
            color='white'
            mt='4'
            bg='teal.500'
            rounded='md'
            shadow='md'
            w='50%'

          >
            <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, magni. Eos, omnis culpa odit doloribus, neque, eaque sed suscipit adipisci aperiam blanditiis error ipsam. Accusantium nemo deleniti autem facilis sapiente?</Text>
          </Box>
        </Slide>

        <Slide     in={isOpen} style={{ zIndex: 40 }}>
          <Box
            p='40px'
            color='white'
            mt='4'
            bg='teal.500'
            rounded='md'
            shadow='md'
            w='30%'
          >
            <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, magni. Eos, omnis culpa odit doloribus, neque, eaque sed suscipit adipisci aperiam blanditiis error ipsam. Accusantium nemo deleniti autem facilis sapiente?</Text>
          </Box>
        </Slide>
      </>
    )
  }