import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Nota = db.define('nota', {
    kodeNota: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    tglNota: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    jamNota: {
        type: DataTypes.TIME,
        allowNull: false
    },
    jumlahBelanja: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    diskon: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export  default Nota;

(async()=>{
    await db.sync();
})();