/* eslint-disable no-unused-vars */
import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { AuthProvider } from "./components/contexts/authContext/index.jsx";
import App from "./App.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode >
    <AuthProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AuthProvider>
  </StrictMode >
);

