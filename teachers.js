const fs = require('fs')
const data = require('./data.json')
const { age, created_date, graduation, date } = require('./utils')

//create
exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fields')
        }
    }

    let {
        avatar_url,
        name,
        birth,
        schooling,
        type_class,
        services
    } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        schooling,
        type_class,
        services,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send('write file error')
    })

    return res.redirect('/teachers')
}

// show
exports.show = function (req, res) {
    const {
        id
    } = req.params

    const foundTeacher = data.teachers.find(function (teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send('Teacher not found')

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        schooling: graduation(foundTeacher.schooling),
        services: foundTeacher.services.split(','),
        created_at: created_date(foundTeacher.created_at),
    }

return res.render("teachers/show", {
    teacher
})
}

exports.edit = function(req, res) {
    const {
        id
    } = req.params

    const foundTeacher = data.teachers.find(function (teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send('Teacher not found')

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render('teachers/edit', { teacher })
}