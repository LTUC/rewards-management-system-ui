import React from "react";
import {
    Box,
    Button,
    Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const LoadCourses = ({ course }) => {

    return (
        <Box>
            <Link as={RouterLink} to={{
                pathname: '/Std',
                state: {
                    course
                }
            }}>
                <Button
                    bg="#140A4F"
                    color="white"
                    m={"12px 7px 12px 7px"}
                    maxW="220"
                    minW="220"
                    minH="70px"
                    fontSize="15"
                    key={course.id}
                >
                    {course.code}
                </Button>
            </Link>
        </Box>
    );
};

export default LoadCourses;