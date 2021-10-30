import React, { useEffect, useState } from "react";
import {Box, Spinner, Flex, useToast} from '@chakra-ui/react'
require('dotenv').config();
import PageHeader from "../../components/PageHeader/PageHeader";
import useResource from '../../hooks/useResource';
import LoadCourses from "./LoadCourses";

const Instructor = () => {
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

            <PageHeader title={"Instructor"} backURL="/" />
            </Box>
            {data ? 
             <Flex flexDir='column' justifyContent='center' alignItems='center'>
            {data.map(course=>{
                return(

            <Box key={course.id}>
                <LoadCourses  course={course}/>
                    
            </Box>
                )
            })}
            </Flex>

            :
                <Flex justifyContent= 'center' alignitems = 'center'>

                    <Spinner size="xl" />
                </Flex>
            }
        </Box>
    )
}

export default Instructor;