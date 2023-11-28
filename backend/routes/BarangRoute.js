import express from "express";
import { getBarang, createBarang } from "../controllers/BarangController.js";

const router = express.Router();

router.get('/barang', getBarang);
router.post('/barang', createBarang);

export default router;