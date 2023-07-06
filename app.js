//Módulos a serem usados neste arquivo
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const paginas = require('./routes/paginas');
const path = require('path'); // módulo para manipulação de diretorios
const post_equip_externo = require('./models/post_equip_externo');
const Tecnicos = require('./models/tecnicos');
const app = express();

//Configurações
    //Body Parser
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    //Handlebars
    app.engine('handlebars', handlebars.engine({
        defaultLayout: 'main',
        runtimeOptions:{
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    }));
    app.set('view engine', 'handlebars');

    //Public
    app.use(express.static(path.join(__dirname, "public")));

//Rotas
app.use('/', paginas); // localhost:8081/exemplo/ ou localhost:8081/exemplo/exemplo_2

app.post('/add_ee', (req, res) => {
    let id_t;

    Tecnicos.findOne({
        attributes: ['id'],
        where: {
            nome: req.body.responsavel
        }
    }).then(tecnicos => {
        id_t = tecnicos.id;

        return post_equip_externo.create({
            entrada: req.body.entrada,
            obs: req.body.obs,
            id_tecnico: id_t
        });
    }).then(() => {
        res.redirect('/equipamento_externo');
    }).catch(erro => {
        console.error('erro nas operações: ', erro);
    });
    console.log('tecnico id: ', id_t);
});

app.get('/deletar/:id', function(req, res){
    post_equip_externo.destroy({where: {'id': req.params.id}}).then(function(){
        res.redirect('/equipamento_externo');
    }).catch(function(erro){
        res.send("O campo que tentou registrar saida não existe!");
    });
});

//Outros
const port = 8081;
app.listen(port, () => {
    console.log("Servidor rodando! Hospedado em: http://localhost:8081");
});