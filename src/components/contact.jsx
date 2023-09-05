
import {Flex,Text,Image ,Grid,GridItem,Input,Button,Box} from '@chakra-ui/react'

export default function Contact(){

    return(
        <Flex direction={['column','row']} >
            <Image src='https://qph.cf2.quoracdn.net/main-qimg-a60584595d47ece95e9c53714c16b3b1-lq'/>
            <Flex  direction='column' borderRadius='10px' bg={'#CBB26A'} justifyContent='space-around' alignItems='center'>
                <Text fontSize='3em' font='bold'>Contact us </Text>
                <Flex direction='row' >
                    <Flex direction='column' gap={'5px'}>
                    <Input borderButtom='black' placeholder='Full Name'/>
                    <Input type='email' borderButtom='black' placeholder='E- mail'/>
                    <Input type='Message' borderButtom='black' placeholder='Message'/>  
                    <Button backGroundColor='#CBB26A' width='100%'>Contact us</Button>
                    </Flex>
<Flex direction='column'>

                    <Flex direction='column'><Text>Contact</Text><Text>styleShoesByLior@gmail.com</Text></Flex>
                    <Flex direction='column'><Text>Based In</Text><Text>Rehovot, Israel</Text></Flex>         
</Flex>
                </Flex>
            </Flex>
        
        </Flex>
    )
}

