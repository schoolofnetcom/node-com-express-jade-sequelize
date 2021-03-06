var express = require('express');
var app     = express();
var Sequelize = require('sequelize');

app.set('views', './views');
app.set('view engine', 'pug');

var sequelize = new Sequelize('mysql://root:@localhost:3306/expressjm')

var User = sequelize.define('User', {
    name: {
        type: Sequelize.STRING
    },
    lastname: Sequelize.STRING
});

User.sync()
    .then(function () {
        return User.create({
            name: 'Otavio',
            lastname: 'Pimentel'
        });
    });

app.get('/users', function (req, res) {
    User
        .findAll()
        .then(function (result) {
            res.render('users', {
                message: 'List of users',
                data   : result
            });
        })
        .catch(function (err) {
            console.log('Error -> ', err);
        });
});

app.get('/users/:id', function (req, res) {
    User
        .findById(req.params.id)
        .then(function (result) {
            res.render('user', {
                message: 'A user',
                data   : result
            });
        })
        .catch(function (err) {
            console.log('Error -> ', err);
        })
    // .findOne({
    //     where: {
    //         id: req.params.id
    //     }
    // })
    // .then(function (result) {
    //     res.render('user', {
    //         message: 'A user',
    //         data   : result
    //     });
    // })
    // .catch(function (err) {
    //     console.log('Error -> ', err);
    // });
});

app.get('/', function (req, res) {
    // Utilizando template engine - Pug
    res.render('index', {
        message: 'Hello world from School of net',
        count: 10
    });
    // Renderizando apenas texto
    // res.end('Hello world from School of net');
});

app.listen(3000, '127.0.0.1', function () {
    console.log('The server has been started...');
})