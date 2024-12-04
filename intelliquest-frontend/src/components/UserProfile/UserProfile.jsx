/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, Button, Center, Flex, Heading, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Profile() {
  const navigate = useNavigate(); // Initialize useNavigate

  // State to store user details fetched from Firestore or Firebase Auth
  const [userDetails, setUserDetails] = useState(null);

  // State to handle errors (e.g., if fetching user data fails)
  const [error, setError] = useState("");

  // Function to fetch user data
  const fetchUserData = async () => {
    // Check if a user is logged in using Firebase Authentication
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Reference the user's document in the Firestore "Users" collection
          const docRef = doc(db, "Users", user.uid);

          // Fetch the document data
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // If user data exists in Firestore, use it
            setUserDetails(docSnap.data());
          } else {
            // If no Firestore data exists, fallback to the user object from Firebase Auth
            setUserDetails({
              email: user.email,
              firstName: user.displayName?.split(" ")[0] || "Unknown", // Extract first name
              lastName: user.displayName?.split(" ")[1] || "", // Extract last name if available
              photo: user.photoURL || "https://via.placeholder.com/150", // Use photoURL or placeholder
            });
          }
        } catch (err) {
          // Set an error message if fetching data fails
          setError("Failed to load user data.");
          console.error(err);
        }
      } else {
        // Handle the case where no user is logged in
        setError("User is not logged in");
      }
    });
  };

  // Use useEffect to fetch user data when the component is mounted
  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Log the user out using Firebase Authentication
      await auth.signOut();

      // Redirect the user to the login page
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      // Log any errors that occur during logout
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <Box>
      {/* Header section with app name and navigation buttons */}
      <Flex as="header" justify="space-between" p={4} bg="cyan.500" color="black">
        <Heading size="lg">IntelliQuest</Heading>
        <Flex gap={4}>
          {/* Login button navigates to the login page */}
          <Button variant="ghost" color="black" onClick={() => navigate("/profile")}>
            Profile
          </Button>
          {/* Sign Up button navigates to the signup page */}
          <Button color="black" bg="white" onClick={() => navigate("/dashboard")}>
            dashboard
          </Button>
        </Flex>
      </Flex>

      <Box maxW="600px" mx="auto" mt="10" p="6" boxShadow="lg" borderRadius="lg" bg="white">
        {error ? (
          // Display error message if there is an error
          <Center>
            <Text color="red.500" fontWeight="bold">
              {error}
            </Text>
          </Center>
        ) : userDetails ? (
          // If userDetails exist, display the profile
          <VStack spacing="6">
            {/* Profile Image */}
            <Center>
              <Image
                src={userDetails.photo || "https://via.placeholder.com/150"}
                alt="Profile"
                boxSize="150px"
                borderRadius="full"
                objectFit="cover"
              />
            </Center>

            {/* Welcome Message */}
            <Heading as="h3" size="lg" textAlign="center">
              Welcome, {userDetails.firstName}! 🙏
            </Heading>

            {/* User Details */}
            <Box textAlign="center">
              <Text>Email: {userDetails.email}</Text>
              <Text>First Name: {userDetails.firstName}</Text>
              {userDetails.lastName && <Text>Last Name: {userDetails.lastName}</Text>}
            </Box>

            {/* Logout Button */}
            <Button colorScheme="red" onClick={handleLogout} width="full">
              Logout
            </Button>
          </VStack>
        ) : (
          // Show a loading spinner while fetching user details
          <Center>
            <Spinner size="lg" />
          </Center>
        )}
      </Box>
    </Box>
  );
}

export default Profile;