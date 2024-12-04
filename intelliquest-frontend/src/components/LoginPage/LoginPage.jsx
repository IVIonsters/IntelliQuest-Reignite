/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, Heading, Flex } from "@chakra-ui/react";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../firebase/auth";
import { useAuth } from "../contexts/authContext/index.jsx";
import { Navigate, useNavigate } from "react-router-dom"; // Import useNavigate
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

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
      <Flex as="header" justify="space-between" p={4} bg="cyan.500" color="black">
        <Heading size="lg">IntelliQuest</Heading>
        <Flex gap={4}>
          {/* Login button navigates to the login page */}
          <Button variant="ghost" color="black" onClick={() => navigate("/login")}>
            Profile
          </Button>
          {/* Sign Up button navigates to the signup page */}
          <Button color="black" bg="white" onClick={() => navigate("/dashboard")}>
            dashboard
          </Button>
        </Flex>
      </Flex>

      {/* Login form */}
      <Box maxW="400px" mx="auto" mt="10">
        <Heading mb="6" textAlign="center">Login</Heading>
        {/* Email input field */}
        <FormControl mb="4">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormControl>

        {/* Password input field */}
        <FormControl mb="6">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>

        {/* Login button */}
        <Button color="white" bg="black" width="100%" onClick={handleLogin}>
          Login
        </Button>

        {/* Google Login button */}
        <Button color="white" bg="black" width="100%" mt="2" onClick={handleGoogleLogin}>
          Google Login
        </Button>
      </Box>
    </>
  );
}

export default LoginPage;