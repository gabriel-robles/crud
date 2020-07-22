const {
    age,
    grade,
    date
} = require('../../lib/utils')
const Student = require('../models/Student')

module.exports = {
    index(req, res) {
        let {
            find,
            page,
            limit
        } = req.query

        page = page || 1
        limit = limit || 5
        let offset = limit * (page - 1)

        const params = {
            find,
            page,
            limit,
            offset
        }

        Student.paginate(params, (students) => {
            const pagination = {
                total: Math.ceil(students[0].total / limit),
                page
            }

            for (student of students) {
                student.school_year = grade(student.school_year)
            }

            return res.render('students/index', {
                students,
                pagination,
                find
            })
        })
    },
    create(req, res) {
        Student.teachersSelectOptions((teachers) => {
            return res.render('students/create', {
                teachers
            })
        })
    },
    show(req, res) {
        Student.find(req.params.id, (student) => {
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
        Student.find(req.params.id, (student) => {
            if (!student) return res.send('Student Not Found')

            student.birth = date(student.birth_date).iso

            Student.teachersSelectOptions((teachers) => {
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

        Student.create(req.body, (student) => {
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

        Student.update(req.body, () => {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res) {
        Student.delete(req.body.id, () => {
            return res.redirect('/students')
        })
    }
}