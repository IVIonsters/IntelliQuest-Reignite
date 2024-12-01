/* eslint-disable no-unused-vars */
import * as React from "react";
import "./landingPage.css"; // Importing CSS for additional styling
import Button from '@mui/material/Button'; // Importing Material-UI Button component
import Box from '@mui/material/Box'; // Importing Material-UI Box component for layout
import ButtonGroup from '@mui/material/ButtonGroup'; // Importing Material-UI ButtonGroup component
import Container from '@mui/material/Container'; // Importing Material-UI Container component

// Array of buttons with margin applied to each button
const buttons = [
  <Button key="one">Login</Button>,
  <Button key="two">Sign Up</Button>,
];

function LandingPage() {
  return (
    <Container
      maxWidth="sm" // Sets the maximum width of the container to small
      sx={{
        display: 'flex', // Flexbox layout
        flexDirection: 'column', // Column direction for flex items
        alignItems: 'center', // Center align items horizontally
        justifyContent: 'center', // Center align items vertically
        height: '100vh', // Full viewport height
      }}
    >
      <Box
        sx={{
          display: 'flex', // Flexbox layout
          flexDirection: 'column', // Column direction for flex items
          alignItems: 'center', // Center align items horizontally
          justifyContent: 'center', // Center align items vertically
          '& > *': {
            m: 1, // Margin for each child element
          },
        }}
      >
        <ButtonGroup color="secondary" size="large" aria-label="Large button group">
          {buttons}
        </ButtonGroup>
      </Box>
    </Container>
  );
}

export default LandingPage;