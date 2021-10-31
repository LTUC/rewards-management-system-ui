import React, { useState } from 'react';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Button,
  FormControl,
  Input,
  FormLabel,
  Heading,
  useToast,
  Link,
} from '@chakra-ui/react';

// import { login } from '../../api/auth';
import { useAuth } from '../../context/auth';
// import PageHeader from '../../components/PageHeader/PageHeader';


const Login = () => {
  

  const { login } = useAuth();
  const [redirect, setRedirect] = useState(false);
  // loginD('admin@admin.com', 'admin');

  const toast = useToast();
  function tessst(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // loginD('sad@sad.com', 'password');
    login(email, password).then((userf) => {
      if (userf?.status === 200) {
        setRedirect(true);
      }
    }).catch(() => {
      toast({
        position: 'bottom',
        title: 'Logain Failed',
        description: 'Unable to login. Please ensure about your email or password',
        status: 'error',
        duration: 2500,
        isClosable: true,
      });
    });
  }


  return (
    <>
     
      <Box>

        <Heading mb={25}>Log in</Heading>

        <Flex align="center" justify="center" flexWrap="wrap">
          <form onSubmit={tessst} >
            <FormControl id="log-in-form" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                mt={3}
                mb={5}
                placeholder="Jana@example.com"
                focusBorderColor="blue.400"
                borderColor="black.400"
                isRequired
                id="email"
                name="email"
              />
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                mt={3}
                mb={5}
                focusBorderColor="blue.400"
                borderColor="black.400"
                isRequired
                id="password"
                name="password"
              />
              <Button colorScheme="blue" background="rgb(36, 170, 226)" width="100%" padding="20px" mt={25} type="submit" >LOG IN</Button>
            </FormControl>
            <Box>
              New to us?{' '}
              <Link as={RouterLink} to="/register" color="teal.500" href="#">
                Sign Up
              </Link>
            </Box>
          </form>
        </Flex>
      </Box>
      {redirect ? <Redirect to="/" /> : null}
    </>
  );
};
export default Login;
