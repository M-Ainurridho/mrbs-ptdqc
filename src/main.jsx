import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import LoginProvider, { UserProvider } from "./lib/context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <LoginProvider>
        <App />
      </LoginProvider>
    </UserProvider>
  </StrictMode>
);
