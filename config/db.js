import Sequelize from "sequelize";
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS, {
    host: process.env.BD_HOST,
    port: 3307,
    dialect: 'mysql',
    timezone: '-06:00', // Configura UTC-6 para la hora de México
    dialectOptions: {
        timezone: 'local' // Usa la zona horaria local del sistema
    },
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});

export default db;
  