const db = require('./db');

const tabela = "gpu";

const gpu = db.sequelize.define(tabela, {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: db.Sequelize.STRING,
    },
    tamanho: {
        type: db.Sequelize.INTEGER,
    },
    modelo: {
        type: db.Sequelize.STRING,
    }
}, {
    freezeTableName: true, //impede a pluralização automatica do nome da tabela
    timestamps: false //Desabilita a criação automática das colunas "createdAt" e "updatedAt"
});

module.exports = gpu
