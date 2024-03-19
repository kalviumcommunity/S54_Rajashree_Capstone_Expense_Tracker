import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
    Image,
    Text,
    Heading,
} from '@chakra-ui/react';


const Login = () => {
    const {
        handleSubmit,
        register,
        reset,
        formState:{errors}
    } = useForm();

    return (
        <Box id='LoginBg'>
            <Flex align="center" justify="between" h="100vh">
                <Image src="https://img.freepik.com/free-photo/group-young-people-training-gym-indoors-maintaining-sportive-lifestyle_155003-45877.jpg?t=st=1709232838~exp=1709236438~hmac=d90624c2cd9abba27b17e847c2c467f599eca7862af4dadc6bfdf5d4d02453a6&w=1060" height="100vh" width="65vw" />
                <Box rounded="md" w="50vw" p="0 100px">

                    <Box>
                        <Heading fontWeight="700" fontSize="40px" pb="10px" color="rgb(52, 97, 96)">Welcome back !!</Heading>
                        <Text pb="30px">Login in to your account</Text>
                        <form onReset={reset}>
                            <VStack spacing={4} align="flex-start">

                                <FormControl >
                                    <FormLabel htmlFor="Username">Username</FormLabel>
                                    <Input {...register("Username", { required: 'Username is required' })} placeholder="Enter your Username" textAlign="left" type="text" variant="filled" />
                                    <FormErrorMessage>{errors.Username?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl >
                                    <FormLabel htmlFor="Password">Password</FormLabel>
                                    <Input
                                        {...register("Password", {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must contain at least 6 characters',
                                            },pattern:{
                                                value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[a-zA-Z]).{8,}$/,
                                                message:"Password must contain atleast 1 lowercase letter, 1 uppercase letter , 1 digit and 1 special character"
                                            }
                                        })}
                                        placeholder="Enter your Password" textAlign="left" type="password"
                                        
                                        variant="filled"
                                        autoComplete='off'
                                        />
                                      <FormErrorMessage>{errors.Password?.message}</FormErrorMessage>
                                </FormControl>  
                                <Button textAlign="left" type="submit" backgroundColor="rgb(84, 152, 161)" color="white" width="full">
                                    Login
                                </Button>
                                <Button textAlign="left" type="reset" colorScheme="gray" width="full">
                                    Reset
                                </Button>
                            </VStack>
                        </form>
                        <Text textAlign="center" p="20px 0" _hover={{ color: "blue.500" }}>Not a User? Sign Up</Text>
                    </Box>

                </Box>
            </Flex>
        </Box>
    );
};

export default Login;
