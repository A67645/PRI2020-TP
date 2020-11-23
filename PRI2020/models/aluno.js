//Import the mongoose module
var mongoose = require('mongoose');
var avalSchema = new mongoose.Schema({
	Numero: String,
	Nome: String,
	Git: String,
	tpc: [Number]
 })

module.exports = mongoose.model(avalSchema, , 'PRI2020');

module.exports.listar = () => {
	return Aluno
		.find()
		.exec()
}

module.exports.consultar = id => {
	return Aluno
		.findOne({_id: id})
		.exec()
}

module.exports.inserir = a => {
	var novo = new Aluno(a)
	return novo.save()
}
