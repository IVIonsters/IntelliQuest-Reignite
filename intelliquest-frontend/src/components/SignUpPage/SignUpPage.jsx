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
  // State variables for form inputs
  const [email, setEmail] = useState(""); // Stores the email entered by the user
  const [password, setPassword] = useState(""); // Stores the password entered by the user
  const [fname, setFname] = useState(""); // Stores the first name entered by the user
  const [lname, setLname] = useState(""); // Stores the last name entered by the user

  const toast = useToast(); // Chakra UI hook for showing toast notifications

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
    <Box
      maxW="400px" // Maximum width of the form container
      mx="auto" // Horizontally centers the container
      mt="10" // Adds margin at the top
      p="6" // Adds padding inside the container
      boxShadow="lg" // Adds a shadow effect
      borderRadius="lg" // Makes the corners rounded
      bg="white" // Sets the background color to white
    >
      {/* Heading for the form */}
      <Heading as="h3" size="lg" textAlign="center" mb="6">
        Sign Up
      </Heading>

      {/* Form for user registration */}
      <form onSubmit={handleRegister}>
        <VStack spacing="4"> {/* Vertically stack the form fields with spacing */}
          {/* First Name Input */}
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your first name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </FormControl>

          {/* Last Name Input */}
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your last name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </FormControl>

          {/* Email Input */}
          <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          {/* Password Input */}
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          {/* Sign Up Button */}
          <Button
            type="submit"
            colorScheme="blue" // Uses Chakra UI's blue color scheme
            width="full" // Makes the button take the full width of the container
          >
            Sign Up
          </Button>
        </VStack>
      </form>

      {/* Link to the Login page */}
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

