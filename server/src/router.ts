import express from "express";
import authActions from "./modules/Auth/authActions";
import charactersActions from "./modules/Characters/charactersActions";
import classWowActions from "./modules/ClassWow/classWowActions";
import serverWowActions from "./modules/ServerWow/serverWowActions";
import verifyToken from "./modules/Auth/middleware";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
// Auth Router
router.post("/auth/register", authActions.register);
router.post("/auth/login", authActions.login);

// Class Router
router.get("/classes", classWowActions.browse);
router.get("/classes/:id", classWowActions.read);

// Server Router
router.get("/servers", serverWowActions.browse);
router.get("/servers/:id", serverWowActions.read);

// Characters Router
router.get("/characters", verifyToken, charactersActions.browse);
router.get("/characters/:id", verifyToken, charactersActions.read);
router.post("/characters", verifyToken, charactersActions.add);
router.put("/characters/:id", verifyToken, charactersActions.update);
router.delete("/characters/:id", verifyToken, charactersActions.remove);

/* ************************************************************************* */

export default router;
