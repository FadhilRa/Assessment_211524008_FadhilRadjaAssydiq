import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Kasir = db.define('kasir', {
    kodeKasir: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    nama: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    hp: {
        type: DataTypes.STRING(32),
        allowNull: false
    }
}, {
    freezeTableName: true
});

export  default Kasir;

(async()=>{
    await db.sync();
})();