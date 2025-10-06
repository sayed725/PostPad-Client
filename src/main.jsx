import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./Components/theme/theme-provider";
import { Toaster } from "react-hot-toast";








// Create a client
const queryClient = new QueryClient();











createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
         <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
           <RouterProvider router={router}  />
           <Toaster position="top-right"/>
         </ThemeProvider>
          {/* <Toaster position="top-right" reverseOrder={false} /> */}
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  // </StrictMode>
);
