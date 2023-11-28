import { response } from "express";
import { Op } from 'sequelize';
import Kasir from "../models/KasirModel.js";

export const getkasir = async(req, res) => {
    try{
        const response = await Kasir.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createKasir = async(req, res) => {
    try{
        const existingKasir = await Kasir.findOne({
        where: {
            [Op.or]: [
            { kodeKasir: req.body.kodeKasir },
            { nama: req.body.nama },
            ],
        },
        });
    
        if (existingKasir) {
        return res.status(400).json({ msg: 'Kasir sudah ada' });
        }

        await Kasir.create(req.body);
        res.status(201).json({msg: "Kasir Ditambahkan"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateKasir = async(req, res) => {
    try {
        await Kasir.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json( { message: "Kasir Diubah" } );
    } catch(error) {
        console.log(error.message);
    }
}

export const deleteKasir = async(req, res) => {
    const { id } = req.params;

    try {
        await Kasir.destroy({
        where: {
            id: id,
        },
        });
        res.status(200).json( { message: "Kasir deleted" } );
    } catch(error) {
        console.log(error.message);
    }
}