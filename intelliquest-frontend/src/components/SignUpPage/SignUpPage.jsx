/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  Link,
  useToast,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const toast = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: ""
        });
      }
      console.log("User Registered Successfully!!");
      toast({
        title: "User Registered Successfully!!",
        status: "success",
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast({
        title: error.message,
        status: "error",
        position: "bottom-center",
      });
    }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="10"
      p="6"
      boxShadow="lg"
      borderRadius="lg"
      bg="white"
    >
      <Heading as="h3" size="lg" textAlign="center" mb="6">
        Sign Up
      </Heading>
      <form onSubmit={handleRegister}>
        <VStack spacing="4">
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your first name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your last name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
          >
            Sign Up
          </Button>
        </VStack>
      </form>

      <Text mt="4" textAlign="center">
        Already registered?{" "}
        <Link color="blue.500" href="/login">
          Login
        </Link>
      </Text>
    </Box>
  );
}

export default SignUpPage;
