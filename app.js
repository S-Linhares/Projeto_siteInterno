//Módulos a serem usados neste arquivo
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const paginas = require('./routes/paginas');
const path = require('path'); // módulo para manipulação de diretorios
const post_equip_externo = require('./models/post_equip_externo');
const Tecnicos = require('./models/tecnicos');
const Dispositivos = require('./models/dispositivo');
const Inspetores = require('./models/inspetores');
const Terceirizados = require('./models/terceirizados');
const Recebimento = require('./models/recebimento');
const Despacho = require('./models/despacho');
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
    async function add_ee(){
        let entry = null;
        try{
            let tecnico = await Tecnicos.findOne({
                attributes: ['id'],
                where: {
                    nome: req.body.responsavel
                }
            });
    
            let id_t = tecnico.id;

            let patri = await Dispositivos.findOne({
                attributes: ['patrimonio'],
                where: {
                    patrimonio: req.body.patrimonio
                }
            });

            if(req.body.inspetor !== 'inspetores' && req.body.terceirizado !== 'terceirizados'){
                let inspetor = await Inspetores.findOne({
                    attributes: ['matricula'],
                    where: {
                        nome: req.body.inspetor
                    }
                });

                let terceirizado = await Terceirizados.findOne({
                    attributes: ['cpf'],
                    where: {
                        nome: req.body.terceirizado
                    }
                });

                let mtr_i = inspetor.matricula;
                let cpf_t = terceirizado.cpf;

                entry = await Recebimento.create({
                    remetente_matricula: mtr_i,
                    remetente_cpf: cpf_t
                });
            }
            
            if(patri !== null){
                console.log('existente!');
            }else{
                await Dispositivos.create({
                    patrimonio: req.body.patrimonio,
                    nome: req.body.nome_dispositivo
                });
                console.log('Não existente... criado!');
            }
            
            if(entry !== null){
                await post_equip_externo.create({
                    entrada: req.body.entrada,
                    obs: req.body.obs,
                    patrimonio_dispositivo: req.body.patrimonio,
                    id_tecnico: id_t,
                    id_recebimento: entry.id
                });
            }else{
                await post_equip_externo.create({
                    entrada: req.body.entrada,
                    obs: req.body.obs,
                    patrimonio_dispositivo: req.body.patrimonio,
                    id_tecnico: id_t
                });
            }
    
            console.log('Operações concluidas!');
        }catch(erro){
            console.log('erro: ', erro);
        }
    }

    add_ee();

    res.redirect('/equipamento_externo');
});

/*app.get('/deletar/:id', function(req, res){
    post_equip_externo.destroy({where: {'id': req.params.id}}).then(function(){
        res.redirect('/equipamento_externo');
    }).catch(function(erro){
        res.send("O campo que tentou registrar saida não existe!");
    });
}); */

app.post('/add_user', (req, res) => {
    async function add_user(){
        try{
            console.log('recebido do body: ', req.body.tipo_user);
            if(req.body.tipo_user == "inspetor"){
                await Inspetores.create({
                    matricula: req.body.mat_cpf,
                    nome: req.body.nome_user,
                    setor: req.body.cargo_setor
                });
            }else if(req.body.tipo_user == "terceirizado"){
                await Terceirizados.create({
                    cpf: req.body.mat_cpf,
                    nome: req.body.nome_user,
                    cargo: req.body.cargo_setor
                });
            }else{
                console.log('erro, recebido do body: ', req.body.tipo_user);
            }
        }catch(erro){
            console.log('erro: ', erro);
        }
    }

    add_user();

    res.redirect('/novo_ee');
});

app.post('/att_ee', (req, res) => {
    async function att_ee(){
        try{
            let remetente_att = null;
            let destinatario_att = null;

            let quadro_saida = await post_equip_externo.findOne({
                where: {
                    id: req.body.quadro_id
                }
            });
            //atualização de recebimento
            if(req.body.terceirizado !== "terceirizados" || req.body.inspetor !== "inspetores"){
                let recebimento_att = await Recebimento.findOne({
                    where: {
                        id: quadro_saida.id_recebimento
                    }
                });

                if(req.body.inspetor_radio === "on"){
                    remetente_att = await Inspetores.findOne({
                        attributes: ['matricula'],
                        where: {
                            nome: req.body.inspetor
                        }
                    });
    
                    await recebimento_att.update({
                        remetente_matricula: remetente_att.matricula
                    });
                }else if(req.body.terceirizado_radio === "on"){
                    remetente_att = await Terceirizados.findOne({
                        attributes: ['cpf'],
                        where: {
                            nome: req.body.terceirizado
                        }
                    });

                    await recebimento_att.update({
                        remetente_cpf: remetente_att.cpf
                    });
                }
            }
            //atualização de despacho
            let despacho = null;

            if(req.body.inspetor_radio_d === "on"){
                destinatario_att = await Inspetores.findOne({
                    attributes: ['matricula'],
                    where: {
                        nome: req.body.inspetor_d
                    }
                });

                despacho = await Despacho.create({
                    destinatario_matricula: destinatario_att.matricula
                });
            }else if(req.body.terceirizado_radio_d === "on"){
                destinatario_att = await Terceirizados.findOne({
                    attributes: ['cpf'],
                    where: {
                        nome: req.body.terceirizado_d
                    }
                });

                despacho = await Despacho.create({
                    destinatario_cpf: destinatario_att.cpf
                });
            }

            //att data de saida e obs
            await quadro_saida.update({
                saida: req.body.saida,
                obs: req.body.obs
            });
        }catch(erro){
            console.log('erro: ', erro);
        }
    }

    att_ee();

    res.redirect('/equipamento_externo');
});

//Outros
const port = 8081;
app.listen(port, () => {
    console.log("Servidor rodando! Hospedado em: http://localhost:8081");
});