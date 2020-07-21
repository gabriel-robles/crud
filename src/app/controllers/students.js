const {
    age,
    grade,
    date
} = require('../../lib/utils')
const Student = require('../models/Student')

module.exports = {
    index(req, res) {
        Student.all(function (students) {
            for (let student of students) {
                student.school_year = grade(student.school_year)
            }

            return res.render('students/index', {
                students
            })
        })
    },
    create(req, res) {
        Student.teachersSelectOptions(function (teachers) {
            return res.render('students/create', {
                teachers
            })
        })
    },
    show(req, res) {
        Student.find(req.params.id, function (student) {
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
        Student.find(req.params.id, function (student) {
            if (!student) return res.send('Student Not Found')

            student.birth = date(student.birth_date).iso

            Student.teachersSelectOptions(function (teachers) {
                return res.render('students/edit', {
                    student,
                    teachers
                })
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

        Student.create(req.body, function (student) {
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

        Student.update(req.body, function () {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res) {
        Student.delete(req.body.id, function () {
            return res.redirect('/students')
        })
    }
}