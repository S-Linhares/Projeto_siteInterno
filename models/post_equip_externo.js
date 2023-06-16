const db = require('./db');

const post_equip_externo = db.sequelize.define('equip_externo', {
    dispositivo: {
        type: db.Sequelize.STRING
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
});

module.exports = post_equip_externo
