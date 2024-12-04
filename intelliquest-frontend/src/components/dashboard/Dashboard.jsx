/* eslint-disable no-unused-vars */
import react from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();
  return (
    <Box>
      <Flex
        as="header"
        justify="space-between"
        align="center"
        p={4}
        bgGradient="linear(to-r, teal.500, green.500)"
        color="white"
        boxShadow="md"
        position="fixed"
        top="0"
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
    </Box>
  );
}

export default Dashboard;