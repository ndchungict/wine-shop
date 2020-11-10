import {Router} from "https://deno.land/x/oak/mod.ts";
import {profileHandle, signInHandler, signUpHandler} from "../controller/userController.ts";
import {jwtMiddleware} from "../middleware/jwtMiddleware.ts";

const router = new Router();
router
    .post("/api/user/sign-in", signInHandler)
    .post("/api/user/sign-up", signUpHandler)
    .get("/api/user/profile",jwtMiddleware,profileHandle)

export default router;
