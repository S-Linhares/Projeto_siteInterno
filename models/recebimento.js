const db = require('./db');
const Inspetores = require('./inspetores');
const Terceirizados = require('./terceirizados');

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

recebimento.belongsTo(Terceirizados, {foreignKey: 'remetente_cpf'});
recebimento.belongsTo(Inspetores, {foreignKey: 'remetente_matricula'});

module.exports = recebimento
