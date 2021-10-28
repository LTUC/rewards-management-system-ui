import React from 'react';

import {Box, Text, Button, Flex, Link} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';


const HomePage = ()=>{

  

        return(
            
            <Box>
                
    
                <Box backgroundColor='#A5E9FE' height="20vh" minW="100%"  alignItems = "center" display="flex" justifyContent="center">
               <Text fontSize='3xl'fontWeight="extrabold" color="#140A4F">
                   Choose Your Role
               </Text>
    
                </Box>
                
                <Box height="80vh">
                <Flex justifyContent='center' alignItems='center' height="100%" flexDirection="column">
                    <Box>
                        <Link as={RouterLink} to= 'ta'>
                        <Button
                         mb="110"
                         minW="135" 
                         minH = "135" 
                         borderRadius="50%" 
                         background='#140A4F'
                         color="#FFFFFF"
                         boxShadow={'0px 2px 5px 0px black' }
                         
                         >
                             
                            TA
                        </Button>
                        
                        </Link>
                    </Box>
                  
                    <Box>
                        <Link as={RouterLink} to='instructor'>
                        <Button 
                         
                        minW="135" 
                        minH = "135" 
                        borderRadius="50%" 
                        background='#140A4F'
                        color="#FFFFFF"
                        boxShadow={'0px 2px 5px 0px black' }
                        
                        >
                            Instructor
                        </Button>
                        
                        </Link>
                    </Box>
                </Flex>
    
                </Box>
            </Box>
        )
    
}

export default HomePage