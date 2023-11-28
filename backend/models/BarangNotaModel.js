import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const BarangNota = db.define('barangNota', {
    jumlahBarang: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    hargaSatuan: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    jumlah: {
        type: DataTypes.SMALLINT,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export  default BarangNota;

(async()=>{
    await db.sync();
})();