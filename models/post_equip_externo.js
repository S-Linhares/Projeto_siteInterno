const db = require('./db');

const tabela = "equip_externo";

const post_equip_externo = db.sequelize.define(tabela, {
    cod_registro: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dispositivo: {
        type: db.Sequelize.STRING,
    },
    patrimonio: {
        type: db.Sequelize.STRING
    },
    remetente: {
        type: db.Sequelize.STRING
    },
    data_entrada: {
        type: db.Sequelize.DATE
    },
    obs: {
        type: db.Sequelize.TEXT
    }
}, {
    freezeTableName: true, //impede a pluralização automatica do nome da tabela
    timestamps: false //Desabilita a criação automática das colunas "createdAt" e "updatedAt"
});

module.exports = post_equip_externo
