const db = require('./db');

const tabela = "dispositivo";

const dispositivos = db.sequelize.define(tabela, {
    patrimonio: {
        type: db.Sequelize.STRING,
        primaryKey: true,
    },
    nome: {
        type: db.Sequelize.STRING,
    },
    id_armazenamento: {
        type: db.Sequelize.INTEGER,
    },
    id_cpu: {
        type: db.Sequelize.INTEGER,
    },
    id_memoria: {
        type: db.Sequelize.INTEGER,
    },
    id_gpu: {
        type: db.Sequelize.INTEGER,
    }
}, {
    freezeTableName: true, //impede a pluralização automatica do nome da tabela
    timestamps: false //Desabilita a criação automática das colunas "createdAt" e "updatedAt"
});

module.exports = dispositivos
