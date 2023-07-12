const express = require('express');
const Tecnicos = require('../models/tecnicos');
const Temporario = require('../models/temporario');
const Post_equip_externo = require('../models/post_equip_externo');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("templates/index");
});

router.get('/equipamento_externo', (req, res) => {
    Post_equip_externo.findAll({
        order: [['id', 'DESC']]
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

router.get('/novo_ee', (req, res) => {
    Tecnicos.findAll({
        order: [['id', 'DESC']]
    }).then(function(tecnicos){
        res.render('templates/new_ee', {tecnicos: tecnicos});
    });
});

/*router.get('/exemplo_2', (req, res) => {
    res.send("Página de exemplos 2!");
}); */


module.exports = router;