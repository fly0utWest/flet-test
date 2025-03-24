import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dashboard from "./pages/Dashboard.tsx";
import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import PostPage from "./pages/PostPage.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <main className="p-4 w-full min-h-full max-w-screen-lg mx-auto flex flex-col items-center border-x-pr md:border-x-2">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/post/:slug" element={<PostPage />}></Route>
          </Routes>
        </BrowserRouter>
      </main>
    </QueryClientProvider>
  </StrictMode>
);
