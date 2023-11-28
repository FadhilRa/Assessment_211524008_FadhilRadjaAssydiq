import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Barang = db.define('barang', {
    kodeBarang: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    namaBarang: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    satuan: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    hargaSatuan: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stok: {
        type: DataTypes.SMALLINT,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export  default Barang;

(async()=>{
    await db.sync();
})();