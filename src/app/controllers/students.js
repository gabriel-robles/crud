const {
    age,
    grade,
    date
} = require('../../lib/utils')
const student = require('../models/Student')

module.exports = {
    index(req, res) {
        student.all(function (students) {
            for (let student of students) {
                student.school_year = grade(student.school_year)
            }

            return res.render('students/index', {
                students
            })
        })
    },
    create(req, res) {
        return res.render('students/create')
    },
    show(req, res) {
        student.find(req.params.id, function (student) {
            if (!student) return res.send('Student Not Found')

            student.age = age(student.birth_date)
            student.birth = date(student.birth_date).birthDay
            student.school_year = grade(student.school_year)


            return res.render('students/show', {
                student
            })
        })
    },
    edit(req, res) {
        student.find(req.params.id, function (student) {
            if (!student) return res.send('Student Not Found')

            student.birth = date(student.birth_date).iso

            return res.render('students/edit', {
                student
            })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields')
            }
        }

        student.create(req.body, function (student) {
            return res.redirect(`/students/${student.id}`)
        })
    },
    update(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields')
            }
        }

        student.update(req.body, function () {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res) {
        student.delete(req.body.id, function () {
            return res.redirect('/students')
        })
    }
}