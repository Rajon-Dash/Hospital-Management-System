import express from "express"
import { sendMessage , getAllMessage} from "../controller/messageController.js";
import {isAdminAuthenticated} from "../moddlewares/auth.js"
const router= express.Router();

router.post("/send",sendMessage);
router.get("/getall",isAdminAuthenticated,getAllMessage);
export default router;