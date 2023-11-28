import { Sequelize } from "sequelize";

const db = new Sequelize('pujas_web', 'postgres', 'assydiq123', {
    host : 'localhost',
    dialect : 'postgres',
    port : 5432.
})

export default db;