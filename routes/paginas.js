const express = require('express');
const Tecnicos = require('../models/tecnicos');
const Dispositivo = require('../models/dispositivo');
const Post_equip_externo = require('../models/post_equip_externo');
const Inspetores = require('../models/inspetores');
const Terceirizados = require('../models/terceirizados');
const Recebimento = require('../models/recebimento');
const Despacho = require('../models/despacho');
const router = express.Router();
const { Op } = require("sequelize");
const Moment = require("moment");

router.get('/', (req, res) => {
    res.render("templates/index");
});

router.get('/equipamento_externo', (req, res) => {
    Post_equip_externo.findAll({
        order: [['id', 'DESC']],
        where: {
            saida: null
        },
        include: [
            {
                model: Tecnicos,
                required: false, //'false' vai forçar uma left join. 'true' vai forçar um inner join
                attributes: ['nome']
            },
            {
                model: Dispositivo,
                required: false,
                attributes: ['nome']
            },
            {
                model: Recebimento,
                required: false,
                include: [
                    {
                        model: Inspetores,
                        required: false,
                        attributes: ['nome']
                    },
                    {
                        model: Terceirizados,
                        required: false,
                        attributes: ['nome']
                    }
                ]
            }
        ]
    }).then(function(quadro){
        res.render('templates/equip_externo', {quadro: quadro});
    });
});

router.get('/historico_ee', (req, res) => {
    async function historico(){
        try{
            let quadro = await Post_equip_externo.findAll({
                order: [['saida', 'DESC']],
                where: {
                    saida: { [Op.ne]: null}, //operador "is not null"
                },
                include: [
                    {
                        model: Tecnicos,
                        required: false, //'false' vai forçar uma left join. 'true' vai forçar um inner join
                        attributes: ['nome']
                    },
                    {
                        model: Dispositivo,
                        required: false,
                        attributes: ['nome']
                    },
                    {
                        model: Recebimento,
                        required: false,
                        include: [
                            {
                                model: Inspetores,
                                required: false,
                                attributes: ['nome']
                            },
                            {
                                model: Terceirizados,
                                required: false,
                                attributes: ['nome']
                            }
                        ]
                    },
                    {
                        model: Despacho,
                        required: false,
                        include: [
                            {
                                model: Inspetores,
                                required: false,
                                attributes: ['nome']
                            },
                            {
                                model: Terceirizados,
                                required: false,
                                attributes: ['nome']
                            }
                        ]
                    }
                ]
            });

            /*let data_entrada = await Post_equip_externo.findAll({
                attributes: ['entrada', 'id'],
                order: [['id', 'DESC']],
                where: {
                    saida: { [Op.ne]: null}, //operador "is not null"
                }
            });*/

            console.log("QUADRO: ", quadro);
            //console.log("ENTRADA: ", data_entrada);

            res.render('templates/historico_ee', {quadro: quadro/*, data_entrada: data_entrada*/});
            
        }catch(erro){
            console.log('erro: ', erro);
        }
    }

    historico();
});

router.get('/aniversarios', (req, res) => {
    res.render("templates/aniversario");
});

router.get('/chaves_de_ativacao', (req, res) => {
    res.render("templates/chave_ativ");
});

router.get('/escala', (req, res) => {
    res.render("templates/escala");
});

router.get('/estoque', (req, res) => {
    res.render("templates/estoque");
});

router.get('/gastos', (req, res) => {
    res.render("templates/gastos");
});

router.get('/usuarios', (req, res) => {
    res.render("templates/usuario");
});

router.get('/novo_user', (req, res) => {
    res.render("templates/new_user");
});

router.get('/novo_ee', (req, res) => {
    async function novo_ee(){
        try{
            let tecnicos = await Tecnicos.findAll({
                order: [['id', 'DESC']]
            });

            let inspetores = await Inspetores.findAll({
                order: [['nome', 'ASC']]
            });

            let terceirizados = await Terceirizados.findAll({
                order: [['nome', 'ASC']]
            });

            res.render('templates/new_ee', {tecnicos: tecnicos, inspetores: inspetores, terceirizados: terceirizados});
            
        }catch(erro){
            console.log('erro: ', erro);
        }
    }

    novo_ee();

    /*Tecnicos.findAll({
        order: [['id', 'DESC']]
    }).then(function(tecnicos){
        res.render('templates/new_ee', {tecnicos: tecnicos});
    });*/
});

router.get('/saida_ee/:id', (req, res) => {
    async function saida_ee(){
        try{

            let inspetores = await Inspetores.findAll({
                order: [['nome', 'ASC']]
            });

            let terceirizados = await Terceirizados.findAll({
                order: [['nome', 'ASC']]
            });

            let quadro = await Post_equip_externo.findOne({
                order: [['id', 'DESC']],
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: Tecnicos,
                        required: false, //'false' vai forçar uma left join. 'true' vai forçar um inner join
                        attributes: ['nome']
                    },
                    {
                        model: Dispositivo,
                        required: false,
                        attributes: ['nome']
                    },
                    {
                        model: Recebimento,
                        required: false,
                        include: [
                            {
                                model: Inspetores,
                                required: false,
                                attributes: ['nome']
                            },
                            {
                                model: Terceirizados,
                                required: false,
                                attributes: ['nome']
                            }
                        ]
                    }
                ]
            });

            res.render('templates/exit_ee', {quadro: quadro, inspetores: inspetores, terceirizados: terceirizados});
        }catch(erro){
            console.log('erro: ', erro);
        }
    }

    saida_ee();
});

/*router.get('/exemplo_2', (req, res) => {
    res.send("Página de exemplos 2!");
}); */


module.exports = router;