import React, { useState, useEffect } from "react";
import { Box, Spinner, Flex, useToast } from '@chakra-ui/react'

import PageHeader from "../../components/PageHeader/PageHeader";
import useCourseRs from '../../hooks/useCourseRs';
import LoadCourses from "./LoadCourse";


const TA = () => {
    const toast = useToast()
    const { resources } = useCourseRs(`${process.env.REACT_APP_HEROKU_ROOT}/courses/`)
    const [data, setData] = useState([])

    useEffect(() => {
        resources().then(data => {

            setData(data)
        }).catch((error) => {

            toast({
                position: 'bottom',
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        })
    }, [])


    return (
        <Box>
            <Box mb='30'>
                <PageHeader title={"TA"} backURL="/" />
            </Box>
            {data ?
                <Flex flexDir='column' justifyContent='center' alignItems='center'>
                    {data.map(course => {
                        return (
                            <Box key={course.id}>
                                <LoadCourses course={course} />
                            </Box>
                        )
                    })}
                </Flex>
                :
                <Flex justifyContent='center' alignitems='center'>

                    <Spinner size="xl" />
                </Flex>
            }
        </Box>
    )
}

export default TA;