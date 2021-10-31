import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { Link as RouterLink } from 'react-router-dom';

import { Flex, IconButton, Link, Text} from '@chakra-ui/react';


const PageHeader = ({
  title,
  backURL,
  }) => {
  
  return (
    <Flex w="100%" h="3.5rem" bg='#A5E9FE' p="0.5rem" direction="row">
     
       

          <Link as={RouterLink} to={backURL || '/'} alignItems="center" d="flex" p="1rem" _hover={{ textDecoration: 'none' }} color="#140A4F">
            <IconButton fontWeight="bold" fontSize="1.25rem" h="1.5rem" w="1.5rem" minW="1.5rem" maxW="1.5rem" justifyContent="flex-start" bg="transparent" _hover={{ background: 'transparent', color: 'black' }} icon={<IoMdArrowBack />} aria-label="back-button" />
            <Text d="inline" fontWeight="bold" _hover={{ textDecoration: 'none' }}>{title}</Text>
          </Link>
       

      
    </Flex>
  );
};

export default PageHeader;
