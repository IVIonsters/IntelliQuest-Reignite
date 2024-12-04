/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, Heading, Flex, Text, Alert, AlertIcon } from "@chakra-ui/react";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../firebase/auth";
import { useAuth } from "../contexts/authContext/index.jsx";
import { Navigate, useNavigate } from "react-router-dom"; // Import useNavigate
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc"; // Import Google icon

function LoginPage() {
  const { userLoggedIn } = useAuth(); // Check if the user is already logged in
  const [email, setEmail] = useState(""); // Stores the email entered by the user
  const [password, setPassword] = useState(""); // Stores the password entered by the user
  const [isSigningIn, setIsSigningIn] = useState(false); // Tracks whether a login process is in progress
  const [errorMessage, setErrorMessage] = useState(""); // Stores error messages for display
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle login with email and password
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Logging in with", { email, password });

    if (!isSigningIn) {
      setIsSigningIn(true); // Disable further login attempts while processing
      try {
        await doSignInWithEmailAndPassword(email, password); // Authenticate with Firebase
      } catch (err) {
        console.error("Error logging in with email and password:", err);
        setErrorMessage(err.message); // Set error message for display
      } finally {
        setIsSigningIn(false); // Re-enable login attempts
      }
    }
  };

  // Handle login with Google
  const handleGoogleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Logging in with Google");

    if (!isSigningIn) {
      setIsSigningIn(true); // Disable further login attempts while processing
      try {
        const result = await doSignInWithGoogle(); // Authenticate with Google
        const user = result.user; // Retrieve the authenticated user's data

        // Save user data to Firestore if logging in for the first time
        const userDocRef = doc(db, "Users", user.uid);
        await setDoc(
          userDocRef,
          {
            email: user.email,
            firstName: user.displayName.split(" ")[0],
            lastName: user.displayName.split(" ")[1] || "",
            photo: user.photoURL || "", // Use provided photo URL or leave empty
          },
          { merge: true } // Prevent overwriting existing data
        );

        console.log("Google Login Successful");
      } catch (err) {
        console.error("Error signing in with Google:", err);
        setErrorMessage(err.message); // Set error message for display
      } finally {
        setIsSigningIn(false); // Re-enable login attempts
      }
    }
  };

  return (
    <>
      {/* Redirect logged-in users to the profile page */}
      {userLoggedIn && <Navigate to="/profile" />}

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
        {/* Login form with glassmorphism effect */}
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
          <Heading mb="6" textAlign="center" color="black">Login</Heading>

          {/* Display error message */}
          {errorMessage && (
            <Alert status="error" mb="4">
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}

          {/* Email input field */}
          <FormControl mb="4">
            <FormLabel color="black">Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              bg="rgba(255, 255, 255, 0.2)"
              color="black"
              border="1px solid black"
              _placeholder={{ color: 'black' }}
            />
          </FormControl>

          {/* Password input field */}
          <FormControl mb="6">
            <FormLabel color="black">Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              bg="rgba(255, 255, 255, 0.2)"
              color="black"
              border="1px solid black"
              _placeholder={{ color: 'black' }}
            />
          </FormControl>

          {/* Login button */}
          <Button
            border="1px solid black"
            colorScheme="white"
            color="black"
            width="full"
            mb="4"
            onClick={handleLogin}>
            Login
          </Button>

          {/* Google Login button */}
          <Button
            border="1px solid black"
            colorScheme="white"
            color="black"
            width="full"
            onClick={handleGoogleLogin}
            leftIcon={<FcGoogle />}
          >
            Continue with Google
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default LoginPage;