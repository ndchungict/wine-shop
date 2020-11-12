import {Router} from "https://deno.land/x/oak/mod.ts";
import {profileHandle, signInHandler, signUpHandler} from "../controller/userController.ts";
import {jwtMiddleware} from "../middleware/jwtMiddleware.ts";
import {addWineHandler, wineCateHandler, wineDetailHandler, wineListHandler} from "../controller/wineController.ts";
import {addToCartHandler} from "../controller/orderController.ts";

const router = new Router();
router
    .post("/api/user/sign-in", signInHandler)
    .post("/api/user/sign-up", signUpHandler)
    .get("/api/user/profile",jwtMiddleware,profileHandle)
    .get("/api/wine/list",wineListHandler)
    .post("/api/wine/add",jwtMiddleware,addWineHandler)
    .get("/api/wine/:id",wineDetailHandler)
    .get("/api/wine/cate/:id",wineCateHandler)
    .post("api/order/add-to-cart/:wineId",jwtMiddleware,addToCartHandler)

export default router;
