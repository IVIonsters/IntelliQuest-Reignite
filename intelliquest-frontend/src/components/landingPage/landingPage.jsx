import React, { useEffect } from "react";
import { Box, Button, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("xl");

  // Automatically open the modal with the desired size on page load
  useEffect(() => {
    setSize("xl"); // Set the desired size before opening the modal
    onOpen();
  }, [onOpen]);

  return (
    <Box>
      {/* Modal Component */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
        <ModalOverlay
          bg="rgba(0, 0, 0, 0.4)" // Semi-transparent overlay
          backdropFilter="blur(5px)" // Glassmorphism effect
        />
        <ModalContent
          bg="rgba(255, 255, 255, 0.2)" // Transparent background
          backdropFilter="blur(10px)" // Blur effect
          boxShadow="lg"
          borderRadius="md"
          border="1px solid rgba(255, 255, 255, 0.4)" // Border for glass look
          color="white" // Light text for contrast
          fontSize={{ base: "xl", md: "4xl" }} // Responsive font size
          textShadow={{ base: "1px 1px 2px black", md: "2px 2px 4px black" }} // Text shadow for contrast
          as='b' // Bold text
          textAlign={{ base: "center", md: "center" }} // Center text on small screens
        >
          <ModalHeader>Welcome to IntelliQuest</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              This site is currently a work in progress. Were working hard to bring you the best
              developer tools and resources!
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
          <Button variant="outline" colorScheme="whiteAlpha" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button variant="solid" colorScheme="whiteAlpha" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </Flex>
      </Flex>

      {/* Hero section with a welcome message and call-to-action */}
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
