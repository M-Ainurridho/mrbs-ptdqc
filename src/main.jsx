import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import LoginProvider, {
  NavLinksProvider,
  UserProvider,
} from "./lib/context.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NavLinksProvider>
      <UserProvider>
        <LoginProvider>
          <App />
        </LoginProvider>
      </UserProvider>
    </NavLinksProvider>
  </StrictMode>
);
