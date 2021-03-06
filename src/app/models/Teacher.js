const db = require('../../config/db')
const {
    date
} = require('../../lib/utils')

module.exports = {
    paginate(params, callback) {
        const {
            find,
            limit,
            offset,
        } = params

        let query = ''
            findQuery = ''
            totalQuery = `(SELECT count(*) FROM teachers) AS total`

        if (find) {
            findQuery = `WHERE teachers.name ILIKE '%${find}%' OR teachers.subjects_taught ILIKE '%${find}%'`
            totalQuery = `(SELECT count(*) FROM teachers ${findQuery}) AS total`
        }

        query = `SElECT *, ${totalQuery} FROM teachers ${findQuery} ORDER BY name ASC LIMIT $1 offset $2`

        db.query(query, [limit, offset], (err, results) => {
            if (err) throw `Database Error ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query =
        `INSERT INTO teachers (
            name,
            avatar_url,
            birth_date,
            education_level,
            class_type,
            subjects_taught,
            created_at
        ) VALUES ($1, $2, $3,$4, $5, $6, $7)
        RETURNING id`

        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.schooling,
            data.type_class,
            data.services,
            date(Date.now()).iso
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT * FROM teachers WHERE id = $1`, [id], (err, results) => {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query =
        `UPDATE teachers SET
            avatar_url = ($1),
            name = ($2),
            birth_date = ($3),
            education_level = ($4),
            class_type = ($5),
            subjects_taught = ($6)
        WHERE id = ($7)`

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.schooling,
            data.type_class,
            data.services,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM teachers WHERE id = ($1)`, [id], (err, results) => {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    }
}