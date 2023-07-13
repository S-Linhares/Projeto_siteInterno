const express = require('express');
const Tecnicos = require('./models/tecnicos');
const Dispositivo = require('./models/dispositivo');
const Post_equip_externo = require('./models/post_equip_externo');

teste = Post_equip_externo.findAll({
    order: [['id', 'DESC']],
    where: {
        saida: null
    },
    include: [
        {
            model: Dispositivo,
            required: true,
            attributes: ['nome']
        },
        {
            model: Tecnicos,
            required: true,
            attributes: ['nome']
        }
    ]
}).then(function(teste){
    console.log(teste);
});

//

/*teste = Post_equip_externo.findAll({
    order: [['id', 'DESC']],
    where: {
        saida: null
    },
    include: [
        {
            model: Tecnicos,
            required: true,
            attributes: ['nome']
        }
    ]
}).then(function(teste){
    console.log(teste);
});

//console.log(teste);*/