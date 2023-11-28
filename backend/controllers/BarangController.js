import { response } from "express";
import { Op } from 'sequelize';
import Barang from "../models/BarangModel.js";

export const getBarang = async(req, res) => {
    try{
        const response = await Barang.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createBarang = async (req, res) => {
    try {
      const existingBarang = await Barang.findOne({
        where: {
          [Op.or]: [
            { kodeBarang: req.body.kodeBarang },
            { namaBarang: req.body.namaBarang },
          ],
        },
      });
  
      if (existingBarang) {
        return res.status(400).json({ msg: 'Barang sudah ada' });
      }
  
      await Barang.create(req.body);
      res.status(201).json({ msg: 'Barang Ditambahkan' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };
  

export const updateBarang = async(req, res) => {
    try {
        await Barang.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json( { message: "Barang Diubah" } );
    } catch(error) {
        console.log(error.message);
    }
}

export const deleteBarang = async (req, res) => {
  const { id } = req.params;

  try {
    await Barang.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Barang deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};