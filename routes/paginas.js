const express = require('express');
const Tecnicos = require('../models/tecnicos');
const Dispositivo = require('../models/dispositivo');
const Post_equip_externo = require('../models/post_equip_externo');
const Inspetores = require('../models/inspetores');
const Terceirizados = require('../models/terceirizados');
const router = express.Router();

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
                required: false, //false vai forçar uma left join. true vai forçar um inner join
                attributes: ['nome']
            },
            {
                model: Dispositivo,
                required: false,
                attributes: ['nome']
            }
        ]
    }).then(function(quadro){
        res.render('templates/equip_externo', {quadro: quadro});
    });
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
    res.render('templates/exit_ee');
});

/*router.get('/exemplo_2', (req, res) => {
    res.send("Página de exemplos 2!");
}); */


module.exports = router;