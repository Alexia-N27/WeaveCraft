import { Router } from "express";
import auth_router from "./auth.routes.js";
import roles_router from "./roles.routes.js";
import addresses_router from "./addresses.routes.js";

const router = Router();
const BASE_API = "/api/v1";

// http://localhost:9000/
// router.get("/", (req, res) => {
//   res.json({message: "Connected to the API !"})
// });


router.use(`${BASE_API}/auth`, auth_router);
router.use(`${BASE_API}/roles`, roles_router);
router.use(`${BASE_API}/addresses`, addresses_router);


export default router;
