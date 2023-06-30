const db = require('./db');

const tabela = "inspetores";

const inspetores = db.sequelize.define(tabela, {
    matricula: {
        type: db.Sequelize.STRING,
        primaryKey: true,
    },
    nome: {
        type: db.Sequelize.STRING,
    },
    setor: {
        type: db.Sequelize.STRING,
    }
}, {
    freezeTableName: true, //impede a pluralização automatica do nome da tabela
    timestamps: false //Desabilita a criação automática das colunas "createdAt" e "updatedAt"
});

module.exports = inspetores
