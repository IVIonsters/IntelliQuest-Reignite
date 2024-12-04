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
  Flex,
  useToast,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function SignUpPage() {
  // State variables for form inputs
  const [email, setEmail] = useState(""); // Stores the email entered by the user
  const [password, setPassword] = useState(""); // Stores the password entered by the user
  const [fname, setFname] = useState(""); // Stores the first name entered by the user
  const [lname, setLname] = useState(""); // Stores the last name entered by the user

  const toast = useToast(); // Chakra UI hook for showing toast notifications
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle the registration process
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      // Create a new user with email and password using Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser; // Get the currently authenticated user
      console.log(user); // Log user data to the console for debugging

      if (user) {
        // If user creation is successful, save additional user data to Firestore
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "", // Placeholder for photo URL (can be updated later)
        });
      }
      console.log("User Registered Successfully!!");

      // Show success notification
      toast({
        title: "User Registered Successfully!!",
        status: "success",
        position: "top-center",
      });
    } catch (error) {
      // Log the error to the console and show an error notification
      console.log(error.message);
      toast({
        title: error.message, // Display the error message in the toast
        status: "error",
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      {/* Header section with app name and navigation buttons */}
      <Flex
        as="header"
        justify="space-between"
        align="center"
        p={4}
        bgGradient="linear(to-r, teal.500, green.500)"
        color="white"
        boxShadow="md"
        position="fixed"
        width="100%"
        zIndex="1000"
      >
        <Flex align="center">
          <Box />
          <Heading size="lg">IntelliQuest</Heading>
        </Flex>
        <Flex gap={4}>
          {/* Profile button navigates to the profile page */}
          <Button variant="outline" colorScheme="whiteAlpha" onClick={() => navigate("/profile")}>
            Profile
          </Button>
          {/* Dashboard button navigates to the dashboard page */}
          <Button variant="solid" colorScheme="whiteAlpha" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
        </Flex>
      </Flex>

      {/* Background Image */}
      <Box
        minH="90vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Sign Up form with glassmorphism effect */}
        <Box
          maxW="400px"
          w="full"
          p="8"
          bg="rgba(255, 255, 255, 0.1)"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          border="1px solid black"
        >
          <Heading mb="6" textAlign="center" color="black">Sign Up</Heading>

          {/* Form for user registration */}
          <form onSubmit={handleRegister}>
            <VStack spacing="4"> {/* Vertically stack the form fields with spacing */}
              {/* First Name Input */}
              <FormControl isRequired>
                <FormLabel color="black">First Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your first name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  bg="rgba(255, 255, 255, 0.2)"
                  color="black"
                  border="1px solid black"
                  _placeholder={{ color: 'black' }}
                />
              </FormControl>

              {/* Last Name Input */}
              <FormControl>
                <FormLabel color="black">Last Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your last name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  bg="rgba(255, 255, 255, 0.2)"
                  color="black"
                  border="1px solid black"
                  _placeholder={{ color: 'black' }}
                />
              </FormControl>

              {/* Email Input */}
              <FormControl isRequired>
                <FormLabel color="black">Email Address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="rgba(255, 255, 255, 0.2)"
                  color="black"
                  border="1px solid black"
                  _placeholder={{ color: 'black' }}
                />
              </FormControl>

              {/* Password Input */}
              <FormControl isRequired>
                <FormLabel color="black">Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg="rgba(255, 255, 255, 0.2)"
                  color="black"
                  border="1px solid black"
                  _placeholder={{ color: 'black' }}
                />
              </FormControl>

              {/* Sign Up Button */}
              <Button
                variant="outline"
                type="submit"
                colorScheme="gray"
                width="full"
              >
                Sign Up
              </Button>
            </VStack>
          </form>

          {/* Link to the Login page */}
          <Text mt="4" textAlign="center" color="black">
            Already registered?{" "}
            <Link color="blue.500" href="/login">
              Login
            </Link>
          </Text>
        </Box>
      </Box>
    </>
  );
}

export default SignUpPage;