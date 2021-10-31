import React, { useState } from 'react';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Redirect, Link as RouterLink } from 'react-router-dom';


import {
  Box,
  Flex,
  Button,
  FormControl,
  Input,
  FormLabel,
  Heading,
  FormErrorMessage,
  Link,
  useToast,
  
} from '@chakra-ui/react';


import { registerD } from '../../context/auth';


const Register = () => {
  

  const [redirect, setRedirect] = useState(false);

  

  const toast = useToast();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required('Email is a required field'),
      username: yup
      .string()
      .required('Username is a required field'),
      firstName: yup
      .string()
      .required('First Name is a required field'),
      lastName: yup
      .string()
      .required('Last Name is a required field'),
    password: yup
      .string()
      .required('Please enter your password')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character',
      ),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .when('password', {
        is: (password) => (!!(password && password.length > 0)),
        then: yup.string().oneOf([yup.ref('password')], "Password doesn't match"),
      }),
  });

  const { register, handleSubmit,  formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      username: '',
     

    },
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  function signUp(data) {
    

    registerD(data).then((user) => {
      if (user) {
        setRedirect(true);
      }
    }).catch(() => {
      toast({
        position: 'bottom',
        title: 'Sign up',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
   
  }


  return (
    <>
     

      <Box>

        <Heading mb={25}>Register</Heading>

        <Flex align="center" justify="center" flexWrap="wrap">
          <form onSubmit={handleSubmit(signUp)} >
            <FormControl minWidth={650} id="log-in-form" isRequired>
              <FormControl isInvalid={!!errors.email}>
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
                  {...register('email', { required: true })}
                />
                <FormErrorMessage>{errors.email?.message} </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.username}>
                <FormLabel>Username</FormLabel>
                <Input
                 type = "text"
                  mt={3}
                  mb={5}
                  placeholder="ahmed111"
                  focusBorderColor="blue.400"
                  borderColor="black.400"
                  isRequired
                  id="username"
                  name="username"
                  {...register('username', { required: true })}
                />
                <FormErrorMessage>{errors?.username?.message} </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
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
                  {...register('password', { required: true })}
                />
                <FormErrorMessage>{errors?.password?.message} </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  mt={3}
                  mb={5}
                  focusBorderColor="blue.400"
                  borderColor="black.400"
                  isRequired
                  id="confirmPassword"
                  name="confirmPassword"
                  {...register('confirmPassword', { required: true })}
                />
                <FormErrorMessage>{errors?.confirmPassword?.message} </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  mt={3}
                  mb={5}
                  placeholder="Ahmad"
                  focusBorderColor="blue.400"
                  borderColor="black.400"
                  isRequired
                  id="firstName"
                  name="firstName"
                  {...register('firstName', { required: true })}
                />
                <FormErrorMessage>{errors?.firstName?.message} </FormErrorMessage>

              </FormControl>
              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  mt={3}
                  mb={5}
                  placeholder="Almohammad"
                  focusBorderColor="blue.400"
                  borderColor="black.400"
                  isRequired
                  id="lastName"
                  name="lastName"
                  {...register('lastName', { required: true })}
                />
                <FormErrorMessage>{errors?.lastName?.message} </FormErrorMessage>

              </FormControl>
              
              <Button colorScheme="blue" background="rgb(36, 170, 226)" width="100%" padding="20px" mt={25} type="submit" >Register</Button>
              {redirect ? <Redirect to="/login" /> : null}
            </FormControl>
            <Box>
              Already have an account?{' '}
              <Link as={RouterLink} to="/login" color="teal.500" href="#">
                Log In
              </Link>
            </Box>
          </form>
        </Flex>

      </Box>
    </>
  );
};
export default Register;
