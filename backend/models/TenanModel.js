import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Tenan = db.define('tenan', {
    kodeTenan: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    namaTenan: {
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

export  default Tenan;

(async()=>{
    await db.sync();
})();