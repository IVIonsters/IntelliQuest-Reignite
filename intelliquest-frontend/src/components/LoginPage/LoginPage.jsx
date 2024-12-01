/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, Heading } from "@chakra-ui/react";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../firebase/auth";
import { useAuth } from "../contexts/authContext/index.jsx";
import { Navigate } from "react-router-dom";

function LoginPage() {
  // const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with", { email, password });
    //! Add Firebase authentication logic here
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password)
    }
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with Google");
    //! Add Firebase authentication logic here
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch(err => {
        setIsSigningIn(false);
        console.error(err + "Error signing in with Google");
      })
    }
  };

  return (
    <>
      {/* {userLoggedIn && <Navigate to="/LandingPage" />} */}
      <Box maxW="400px" mx="auto" mt="10">
        <Heading mb="6" textAlign="center">Login</Heading>
        <FormControl mb="4">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormControl>
        <FormControl mb="6">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>
        <Button color="white" bg="black" width="100%" onClick={handleLogin}>
          Login
        </Button>
        <Button color="white" bg="black" width="100%" mt="2" onClick={handleGoogleLogin}>
          Google Login
        </Button>
      </Box>
    </>
  );
}

export default LoginPage;
