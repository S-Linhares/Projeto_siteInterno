const db = require('./db');

const tabela = "terceirizados";

const terceirizados = db.sequelize.define(tabela, {
    cpf: {
        type: db.Sequelize.STRING,
        primaryKey: true,
    },
    nome: {
        type: db.Sequelize.STRING,
    },
    cargo: {
        type: db.Sequelize.STRING,
    }
}, {
    freezeTableName: true, //impede a pluralização automatica do nome da tabela
    timestamps: false //Desabilita a criação automática das colunas "createdAt" e "updatedAt"
});

module.exports = terceirizados
