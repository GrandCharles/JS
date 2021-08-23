const Sequelize = require('sequelize');
const db = require('../db/connection');

const mdVaga = db.define('tb_vagas', {
    titulo: { type: Sequelize.STRING, },
    descricao:{type: Sequelize.STRING,},
    salario: { type: Sequelize.STRING, },
    empresa: { type: Sequelize.STRING, },
    email: { type: Sequelize.STRING, },
    novo: { type: Sequelize.INTEGER, }
});

//Exportar
module.exports = mdVaga
