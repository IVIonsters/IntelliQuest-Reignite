/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate(); // Hook to navigate programmatically between routes

  return (
    <Box>
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
          <Button variant="outline" colorScheme="whiteAlpha" onClick={() => navigate("/login")}>
            Login
          </Button>
          {/* Dashboard button navigates to the dashboard page */}
          <Button variant="solid" colorScheme="whiteAlpha" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </Flex>
      </Flex>

      {/* Hero section with a welcome message and call-to-action */}
      <Flex
        direction="column" // Stack items vertically
        align="center" // Center items horizontally
        justify="center" // Center items vertically
        height="80vh" // Take up 80% of the viewport height
        bg="gray.50" // Light gray background color
        textAlign="center" // Center text content
        px={4} // Add padding on the left and right
      >
        <Heading size="2xl" mb={4}>
          Welcome to IntelliQuest
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          Your gateway to the best developer resources, study tools, and community.
        </Text>
        {/* Call-to-action button navigates to the signup page */}
        <Button size="lg" color="black" onClick={() => navigate("/signup")}>
          Get Started
        </Button>
      </Flex>
    </Box>
  );
}

export default LandingPage;
