import express from "express";
import { addCredential, getCredentials, updateCredential, deleteCredential } from "../controllers/credentialController.js";

const router = express.Router();

router.post("/add", addCredential);
router.get("/:userId", getCredentials);
router.put("/:id", updateCredential);
router.delete("/:id", deleteCredential);

export default router;
