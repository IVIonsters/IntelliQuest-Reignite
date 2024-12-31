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
        height="85vh"
        bgGradient="linear(to-br, teal.500, green.500)"
        align="center"
        justify="center"
        p={4}
      >
        <Box
          maxW="3xl"
          width="full"
          backdropFilter="blur(10px)"
          bg="rgba(255, 255, 255, 0.2)"
          p={6}
          borderRadius="md"
          boxShadow="lg"
          border="1px solid rgba(255, 255, 255, 0.3)"
        >
          <Heading
            as="h1"
            size="2xl"
            mb={4}
            color="white"
            textAlign="center"
            fontWeight="extrabold"
          >
            Welcome to{" "}
            <Text
              as="span"
              bgGradient="linear(to-r, teal.200, green.200)"
              bgClip="text"
            >
              IntelliQuest
            </Text>
          </Heading>
          <Text fontSize="lg" mb={6} color="whiteAlpha.900" textAlign="center">
            Empower your learning journey with curated developer resources and tools.
          </Text>
          <Flex
            direction={{ base: "column", sm: "row" }}
            justify="center"
            align="center"
            gap={4}
          >
            <Button
              size="lg"
              variant="outline"
              color="white"
              borderColor="whiteAlpha.800"
              _hover={{ bg: "whiteAlpha.300", borderColor: "white" }}
              onClick={() => navigate("/resources")}
            >
              Explore Resources
            </Button>
            <Button
              size="lg"
              bgGradient="linear(to-r, teal.300, green.300)"
              _hover={{ bgGradient: "linear(to-r, teal.400, green.400)" }}
              color="white"
              fontWeight="semibold"
              onClick={() => navigate("/signup")}
            >
              Join Us
            </Button>
          </Flex>
          <Flex
            mt={8}
            gridGap={4}
            flexDirection={{ base: "column", sm: "row" }}
            justify="center"
          >
            {["Handcrafted", "Unique", "Sustainable"].map((feature, index) => (
              <Box
                key={index}
                bg="rgba(255, 255, 255, 0.2)"
                p={4}
                borderRadius="md"
                backdropFilter="blur(5px)"
                textAlign="center"
                border="1px solid rgba(255, 255, 255, 0.3)"
              >
                <Heading as="h2" size="md" mb={2} color="white">
                  {feature}
                </Heading>
                <Text fontSize="sm" color="whiteAlpha.800">
                  Our resources are {feature.toLowerCase()} and made with care.
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>


    </Box>
  );
}

export default LandingPage;
