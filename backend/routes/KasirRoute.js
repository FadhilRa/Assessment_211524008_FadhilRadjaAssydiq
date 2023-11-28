import express from "express";
import { getkasir, createKasir, updateKasir, deleteKasir } from "../controllers/KasirController.js";

const router = express.Router();

router.get('/kasir', getkasir);
router.post('/kasir', createKasir);
router.put('/kasir/:id', updateKasir);
router.delete('/kasir/:id', deleteKasir);

export default router;