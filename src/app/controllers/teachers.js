const {
    age,
    graduation,
    date
} = require('../../lib/utils')
const Teacher = require('../models/Teacher')

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

        Teacher.paginate(params, (teachers) => {
            const pagination = {
                total: Math.ceil(teachers[0].total / limit),
                page
            }

            for (teacher of teachers) {
                teacher.subjects_taught = teacher.subjects_taught.split(',')
            }

            return res.render('teachers/index', {
                teachers,
                pagination,
                find
            })
        })
    },
    create(req, res) {
        return res.render('teachers/create')
    },
    show(req, res) {
        Teacher.find(req.params.id, (teacher) => {
            if (!teacher) return res.send('Teacher Not Found')

            teacher.age = age(teacher.birth_date)
            teacher.services = teacher.subjects_taught.split(',')
            teacher.schooling = graduation(teacher.education_level)
            teacher.created_at = date(teacher.created_at).create

            return res.render('teachers/show', {
                teacher
            })
        })
    },
    edit(req, res) {
        Teacher.find(req.params.id, (teacher) => {
            if (!teacher) return res.send('Teacher Not Found')

            teacher.birth = date(teacher.birth_date).iso

            return res.render('teachers/edit', {
                teacher
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

        Teacher.create(req.body, (teacher) => {
            return res.redirect(`/teachers/${teacher.id}`)
        })
    },
    update(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields')
            }
        }

        Teacher.update(req.body, () => {
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },
    delete(req, res) {
        Teacher.delete(req.body.id, () => {
            return res.redirect('/teachers')
        })
    }
}