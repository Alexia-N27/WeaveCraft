import { Router } from "express";
import auth_router from "./auth.routes.js";

const router = Router();
const BASE_API = "/api/v1";

// http://localhost:9000/
router.get("/", (req, res) => {
  res.json({message: "Connected to the API !"})
});


router.use(`${BASE_API}/auth`, auth_router);



export default router;
