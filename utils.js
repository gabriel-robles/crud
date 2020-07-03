module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
            age = age - 1
        }

        return age
    },
    created_date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getFullYear()
        const month = `0${date.getMonth() + 1}`.slice(-2)
        const day = `0${date.getDate()}`.slice(-2)

        return `${day}/${month}/${year}`
    },
    graduation: function(schooling) {
        if (schooling == "EM") {
            return 'Ensino Médio Completo'
        } else {
            if (schooling == "ES") {
                return 'Ensino Superior Completo'
            } else {
                if (schooling == "M") {
                    return 'Mestrado'
                } else {
                    return 'Doutorado'
                }
            }
        }
    },
    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return `${year}-${month}-${day}`
    } 
}