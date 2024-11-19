import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppProvider } from "./providers/AppProvider.tsx";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Task1 from "./Task1.tsx";
import Home from "./Home.tsx";
import Task2 from "./Task2.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <nav className="container flex flex-row gap-4 mx-auto my-9">
          <Link
            to={"task1"}
            className="font-mono text-lg font-semibold text-blue-800 hover:text-blue-400 hover:underline"
          >
            Task 1
          </Link>

          <Link
            to={"task2"}
            className="font-mono text-lg font-semibold text-blue-800 hover:text-blue-400 hover:underline"
          >
            Task 2
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task1" element={<Task1 />} />
          <Route path="/task2" element={<Task2 />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
