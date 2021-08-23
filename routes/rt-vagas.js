const express = require('express');
const router = express.Router();
const mdVag = require('../models/md-vaga');

// Buscando um registro para a view-vaga
router.get('/view-vaga/:id',(req,resp) => mdVag.findOne({where: {id: req.params.id}})
      .then(vags => {resp.render('view-vaga',{vags})})
      .catch(err => console.log(err)));


// Acessando nova-vaga.handlebas

router.get('/nova-vaga', (req, resp) => {
    resp.render('nova-vaga')
});


// Adicionando registro na tabela tb_vagas via post
router.post('/nova-vaga', (req, resp) => {
    let { titulo, descricao, salario, empresa, email, novo } = req.body;

    // Inserindo    
    mdVaga.create({
        titulo,
        descricao,
        salario,
        empresa,
        email,
        novo
    })
        .then(() => resp.redirect('/'))
        .catch(err => console.log(err + ' Deu Erro na inserção de registro na tabela tb_vagas!'))
});

// Exportar
module.exports = router
