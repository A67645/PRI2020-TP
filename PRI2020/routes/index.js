var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/alunos', (req, res) => {
	Aluno.listar()
		.then(dados => res.render('alunos', {lista: dados}))
		.catch(e => res.render('error', {error: e}))
})

module.exports = router;
