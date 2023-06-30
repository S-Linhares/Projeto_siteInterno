const db = require('./db');

const tabela = "recebimento";

const recebimento = db.sequelize.define(tabela, {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    remetente_matricula: {
        type: db.Sequelize.STRING,
    },
    remetente_cpf: {
        type: db.Sequelize.STRING,
    }
}, {
    freezeTableName: true, //impede a pluralização automatica do nome da tabela
    timestamps: false //Desabilita a criação automática das colunas "createdAt" e "updatedAt"
});

module.exports = recebimento
