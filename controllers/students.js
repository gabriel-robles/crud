const fs = require('fs')
const data = require('../data.json')
const {
    age,
    date,
    grade
} = require('../utils')

exports.index = function (req, res) {
    const students = data.students
    const newStudents = []

    for (let foundStudents of students) {
        const student = {
            ...foundStudents,
            school_year: grade(foundStudents.school_year)
        }

        newStudents.push(student)
     }

    return res.render('students/index', {
        students: newStudents
    })
}

exports.create = function (req, res) {
    return res.render('students/create')
}

exports.show = function (req, res) {
    const {
        id
    } = req.params

    const foundStudent = data.students.find(function (student) {
        return student.id == id
    })

    if (!foundStudent) return res.send('Student not found')

    const student = {
        ...foundStudent,
        age: age(foundStudent.birth),
        birth: date(foundStudent.birth).birthDay,
        school_year: grade(foundStudent.school_year)
    }

    return res.render("students/show", {
        student
    })
}

exports.edit = function (req, res) {
    const {
        id
    } = req.params

    const foundStudent = data.students.find(function (student) {
        return student.id == id
    })

    if (!foundStudent) return res.send('Student not found')

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render('students/edit', {
        student
    })
}

exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fields')
        }
    }

    birth = Date.parse(req.body.birth)

    const lastStudent = data.students[data.students.length - 1]
    let id = 1

    if (lastStudent) {
        id = lastStudent.id + 1
    }

    data.students.push({
        id,
        ...req.body,
        birth,
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send('write file error')
    })

    return res.redirect('/students')
}

exports.update = function (req, res) {
    const {
        id
    } = req.body
    let index = 0

    const foundStudent = data.students.find(function (student, foundIndex) {
        if (id == student.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) return res.send('Student not found')

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send('write file error')
    })

    return res.redirect(`/students/${id}`)
}

exports.delete = function (req, res) {
    const {
        id
    } = req.body

    const filteredStudents = data.students.filter(function (student) {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send('write file error')
    })

    return res.redirect(`/students`)
}