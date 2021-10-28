import React, {useState, useEffect} from "react";
import {Box, Spinner, Flex, useToast} from '@chakra-ui/react'

import PageHeader from "../../components/PageHeader/PageHeader";
import useResource from '../../hooks/useResource';
import LoadCourses from "./LoadCourse";


const TA = ()=>{
    const toast = useToast()
    const {resources} = useResource(`${process.env.REACT_APP_HEROKU_ROOT}/courses/`)
    const [data, setData] = useState([])

    useEffect(()=>{
        resources().then(data=>{
           
            setData(data)
        }).catch((error)=>{
            
            toast({
                position: 'bottom',
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        })
    },[])
    
   
    return(

        <Box>
            <Box mb='30'>

            <PageHeader title={"TA"} backURL="/" />
            </Box>
            {data ? 
            <>
            
            <Box>
                <LoadCourses  data={data}/>
                    
            </Box>
            </>

            :
                <Flex justifyContent= 'center' alignitems = 'center'>

                    <Spinner size="xl" />
                </Flex>
            }
        </Box>
    )
}

export default TA;