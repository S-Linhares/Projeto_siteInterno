const db = require('./db');

const tabela = "despacho";

const despacho = db.sequelize.define(tabela, {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    destinatario_matricula: {
        type: db.Sequelize.STRING,
    },
    destinatario_cpf: {
        type: db.Sequelize.STRING,
    }
}, {
    freezeTableName: true, //impede a pluralização automatica do nome da tabela
    timestamps: false //Desabilita a criação automática das colunas "createdAt" e "updatedAt"
});

module.exports = despacho
