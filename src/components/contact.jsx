
import {Flex,Text,Image ,Grid,GridItem,Input,Button} from '@chakra-ui/react'

export default function Contact(){

    return(
        <Flex>
            <Image src='https://qph.cf2.quoracdn.net/main-qimg-a60584595d47ece95e9c53714c16b3b1-lq'/>
            <Flex  direction='column' backGroundColor='#CBB26A' >
                <Text fontSize='3em' font='bold'>Contact us </Text>
                <Grid templateRows='repeat(4, 1fr)' templateColumns='repeat(2, 1fr)'>
                    <GridItem rowSpan='1' colSpan='1'><Input borderButtom='black' placeholder='Full Name'></Input></GridItem>
                    <GridItem rowSpan='1' colSpan='1'><Input type='email' borderButtom='black' placeholder='E- mail'></Input></GridItem>
                    <GridItem rowSpan='1' colSpan='1'><Input type='Message' borderButtom='black' placeholder='Message'></Input></GridItem>  
                    <GridItem rowSpan='1' colSpan='1'><Button backGroundColor='#CBB26A' width='100%'>Contact us</Button></GridItem>
                    <GridItem rowSpan='1' colSpan='1'><Flex><Text>Contact</Text><Text>styleShoesByLior@gmail.com</Text></Flex></GridItem>
                    <GridItem rowSpan='1' colSpan='1'><Flex><Text>Based In</Text><Text>Rehovot, Israel</Text></Flex></GridItem>         
                </Grid>
            </Flex>
        
        </Flex>
    )
}

