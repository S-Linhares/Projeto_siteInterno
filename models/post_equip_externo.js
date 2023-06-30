const db = require('./db');

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

module.exports = post_equip_externo
