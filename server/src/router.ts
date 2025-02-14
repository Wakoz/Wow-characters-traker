import express from "express";
import authActions from "./modules/Auth/authActions";
import charactersActions from "./modules/Characters/charactersActions";
import classWowActions from "./modules/ClassWow/classWowActions";
import serverWowActions from "./modules/ServerWow/serverWowActions";
import verifyToken from "./modules/Auth/middleware";
import validateAuth from "./modules/Auth/AuthValidation";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
// Auth Router
router.post(
  "/api/auth/register",
  validateAuth("register"),
  authActions.register,
);
router.post("/api/auth/login", validateAuth("login"), authActions.login);

// Class Router
router.get("/api/classes", classWowActions.browse);
router.get("/api/classes/:id", classWowActions.read);

// Server Router
router.get("/api/servers", serverWowActions.browse);
router.get("/api/servers/:id", serverWowActions.read);

// Characters Router
router.get("/api/characters", verifyToken, charactersActions.browse);
router.get("/api/characters/:id", verifyToken, charactersActions.read);
router.post("/api/characters", verifyToken, charactersActions.add);
router.put("/api/characters/:id", verifyToken, charactersActions.update);
router.delete("/api/characters/:id", verifyToken, charactersActions.remove);

/* ************************************************************************* */

export default router;
