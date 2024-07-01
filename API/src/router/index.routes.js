import { Router } from "express";
import auth_router from "./auth.routes.js";
import roles_router from "./roles.routes.js";
import addresses_router from "./addresses.routes.js";
import contacts_router from "./contacts.routes.js";
import categories_router from "./categories.routes.js";
import products_router from "./products.routes.js";
import additionalPictures_router from "./additionalPictures.routes.js";
import orders_router from "./orders.routes.js";
import orderDetails_router from "./orderDetails.routes.js";

const router = Router();
const BASE_API = "/api/v1";

// // http://localhost:9000/
// router.get("/", getHomePage);


router.use(`${BASE_API}/auth`, auth_router);
router.use(`${BASE_API}/roles`, roles_router);
router.use(`${BASE_API}/addresses`, addresses_router);
router.use(`${BASE_API}/contacts`, contacts_router);
router.use(`${BASE_API}/categories`, categories_router);
router.use(`${BASE_API}/products`, products_router);
router.use(`${BASE_API}/additionalPictures`, additionalPictures_router);
router.use(`${BASE_API}/orders`, orders_router);
router.use(`${BASE_API}/orderDetails`, orderDetails_router);


export default router;
