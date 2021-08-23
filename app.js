const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/connection');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const mdVaga = require('./models/md-vaga');

const PORT = 3000;

app.listen(PORT, function () {
    console.log(`O Express esta rodando na porta ${PORT}`);
})

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))

// Handlebars 
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.get('/', (req, resp) => {
    let busca = req.query.mdVaga;
    let query = '%' + busca + '%';

    if (!busca) {

        mdVaga.findAll({
            order: [['createdAt', 'DESC']]
        })
            .then(vags => {resp.render('index', {vags});
        })
            .catch(err => console.log(err));

    } else {

        mdVaga.findAll({
            where: {titulo:{[Op.like]:query}},
            order: [['createdAt', 'DESC']]
        })
            .then(vags => {resp.render('index', {vags,busca});
        })
            .catch(err => console.log(err));
    }
});

// db Connections
db
    .authenticate()
    .then(() => {
        console.log("Conectou no BD com sucesso!");
    })
    .catch(err => {
        console.log("Não conectou no BD!", err);
    })

// Rota vagas
app.use('/rt-vagas', require('./routes/rt-vagas'))
