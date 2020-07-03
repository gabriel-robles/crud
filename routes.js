const express = require('express')
const routes = express.Router()

routes.get('/', function(req, res) {
    return res.redirect('/teachers')
})

routes.get('/teachers', function(req, res) {
    return res.render('teachers/teacher')
})

routes.get('/teachers/create', function (req, res) {
    return res.render('teachers/create')
})

module.exports = routes