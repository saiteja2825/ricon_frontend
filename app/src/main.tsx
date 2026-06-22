import { createRoot } from "react-dom/client";
import { setBaseUrl } from "@workspace/api-client-react";
import { API_URL } from "./lib/api";
import App from "./App";
import "./index.css";

// Configure all React Query API hooks to prefix paths with the environment API_URL
setBaseUrl(API_URL);

createRoot(document.getElementById("root")!).render(<App />);
