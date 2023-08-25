const db = require('./db');
const Tecnicos = require('./tecnicos');
const Dispositivo = require('./dispositivo');
const Despacho = require('./despacho');
const Recebimento = require('./recebimento');

const tabela = "quadro";

const post_equip_externo = db.sequelize.define(tabela, {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    entrada: {
        type: db.Sequelize.DATE
    },
    saida: {
        type: db.Sequelize.DATE
    },
    obs: {
        type: db.Sequelize.TEXT
    },
    patrimonio_dispositivo: {
        type: db.Sequelize.STRING,
    },
    id_tecnico: {
        type: db.Sequelize.INTEGER
    },
    id_recebimento: {
        type: db.Sequelize.INTEGER
    },
    id_despacho: {
        type: db.Sequelize.INTEGER
    }
}, {
    freezeTableName: true, //impede a pluralização automatica do nome da tabela
    timestamps: false //Desabilita a criação automática das colunas "createdAt" e "updatedAt"
});

post_equip_externo.belongsTo(Tecnicos, {foreignKey: 'id_tecnico'}); //demarcando que a tabela quadro tem associação 1:1 com a tabela tecnico, sendo a chave estrangeira 'id_tecnico'
post_equip_externo.belongsTo(Dispositivo, {foreignKey: 'patrimonio_dispositivo'});
post_equip_externo.belongsTo(Despacho, {foreignKey: 'id_despacho'});
post_equip_externo.belongsTo(Recebimento, {foreignKey: 'id_recebimento'});

module.exports = post_equip_externo
