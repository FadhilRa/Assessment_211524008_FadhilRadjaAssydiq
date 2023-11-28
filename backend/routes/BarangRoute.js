import express from "express";
import { getBarang, createBarang, updateBarang, deleteBarang } from "../controllers/BarangController.js";

const router = express.Router();

router.get('/barang', getBarang);
router.post('/barang', createBarang);
router.put('/barang/:id', updateBarang);
router.delete('/barang/:id', deleteBarang);

export default router;