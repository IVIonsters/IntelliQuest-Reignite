/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, Heading } from "@chakra-ui/react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with", { email, password });
    //! Add Firebase authentication logic here
  };

  return (
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
    </Box>
  );
}

export default LoginPage;
