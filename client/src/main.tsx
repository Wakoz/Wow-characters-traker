// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./Styles/wow-theme.css";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import AuthPage from "./pages/AuthPage/AuthPage";
import { isAuthenticated } from "./services/auth";
import CharactersPage from "./pages/CharactersPage/CharactersPage";
import CharacterFormPage from "./pages/CharactersPage/CharactersEditPage";
import HomePage from "./pages/HomePage";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */
const protectedLoader = () => {
  if (!isAuthenticated()) {
    throw new Error("Not authenticated");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
       },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "characters",
        element: <CharactersPage />,
        loader: protectedLoader,
        errorElement: <Navigate to="/auth" />,
      },
      {
        path: "/characters/new",
        element: <CharacterFormPage />,
      },
      {
        path: "/characters/edit/:id",
        element: <CharacterFormPage />,
      },
      {
        path: "/",
        element: <Navigate to="/characters/" replace />,
      },
    ],
  },
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
