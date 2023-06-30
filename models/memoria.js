const db = require('./db');

const tabela = "memoria";

const memoria = db.sequelize.define(tabela, {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: db.Sequelize.STRING,
    },
    capacidade: {
        type: db.Sequelize.INTEGER,
    },
    velocidade: {
        type: db.Sequelize.FLOAT,
    },
    ddr: {
        type: db.Sequelize.INTEGER,
    }
}, {
    freezeTableName: true, //impede a pluralização automatica do nome da tabela
    timestamps: false //Desabilita a criação automática das colunas "createdAt" e "updatedAt"
});

module.exports = memoria
