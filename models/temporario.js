const db = require('./db');

const tabela = "temporario";

const temporario = db.sequelize.define(tabela, {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    patrimonio: {
        type: db.Sequelize.STRING,
    },
    dispositivo: {
        type: db.Sequelize.STRING,
    },
    responsavel: {
        type: db.Sequelize.STRING,
    },
    entrada: {
        type: db.Sequelize.DATE,
    },
    obs: {
        type: db.Sequelize.STRING,
    },
    remetente: {
        type: db.Sequelize.STRING,
    }
}, {
    freezeTableName: true, //impede a pluralização automatica do nome da tabela
    timestamps: false //Desabilita a criação automática das colunas "createdAt" e "updatedAt"
});

module.exports = temporario
