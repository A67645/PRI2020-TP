//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/PRI2020';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function () {
    console.log("Conexão ao MongoDB realizada com sucesso...")
});

var shopListSchemaSchema = new mongoose.Schema({
    Product: String,
    Quantity: Number,
    Category: String
});

var shopListModel = mongoose.model('list', shopListSchemaSchema)

// Retrieve all students
shopListModel
    .find(function (err, docs) {
        if (err) {
            console.log('Error retrieving student records: ' + err)
        }
        else {
            console.log(docs)
        }
    })