const db = require('./db');
const Inspetores = require('./inspetores');
const Terceirizados = require('./terceirizados');

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

despacho.belongsTo(Inspetores, {foreignKey: 'destinatario_matricula'});
despacho.belongsTo(Terceirizados, {foreignKey: 'destinatario_cpf'});

module.exports = despacho
