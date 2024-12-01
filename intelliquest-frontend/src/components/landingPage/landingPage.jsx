/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <Box>
      {/* Header */}
      <Flex as="header" justify="space-between" p={4} bg="cyan.500" color="black">
        <Heading size="lg">IntelliQuest</Heading>
        <Flex gap={4}>
          <Button variant="ghost" color="black" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button color="black" bg="white" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </Flex>
      </Flex>

      {/* Hero Section */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="80vh"
        bg="gray.50"
        textAlign="center"
        px={4}
      >
        <Heading size="2xl" mb={4}>
          Welcome to IntelliQuest
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          Your gateway to the best developer resources, study tools, and community.
        </Text>
        <Button size="lg" color="black" onClick={() => navigate("/signup")}>
          Get Started
        </Button>
      </Flex>
    </Box>
  );
}

export default LandingPage;