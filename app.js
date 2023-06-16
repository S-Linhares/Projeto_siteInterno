//Módulos a serem usados neste arquivo
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const exemplo = require('./routes/exemplo');
const path = require('path'); // módulo para manipulação de diretorios
const post_equip_externo = require('./models/post_equip_externo');
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
app.use('/', exemplo); // localhost:8081/exemplo/ ou localhost:8081/exemplo/exemplo_2

app.post('/add_ee', (req, res) => {
    post_equip_externo.create({
        dispositivo: req.body.nome_dispositivo,
        patrimonio: req.body.patrimonio,
        remetente: req.body.remetente,
        data_entrada: req.body.entrada,
        obs: req.body.obs
    }).then(() => {
        res.redirect('/equipamento_externo');
    }).catch((erro) => {
        res.send("Houve um erro: " + erro);
    });
});

//Outros
const port = 8081;
app.listen(port, () => {
    console.log("Servidor rodando! Hospedado em: http://localhost:8081");
});