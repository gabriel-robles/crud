module.exports = {
    age: function (timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
            age = age - 1
        }

        return age
    },
    graduation: function (schooling) {
        if (schooling == "EM") {
            return 'Ensino Médio Completo'
        } else if (schooling == "ES") {
            return 'Ensino Superior Completo'
        } else if (schooling == "M") {
            return 'Mestrado'
        } else {
            return 'Doutorado'
        }
    },
    date: function (timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            create: `${day}/${month}/${year}`
        }
    },
    grade: function (schoolYear) {
        if (schoolYear == "5F") {
            return "5° Ano do Ensino Fundamental"
        } else if (schoolYear == "6F") {
            return "6° Ano do Ensino Fundamental"
        } else if (schoolYear == "7F") {
            return "7° Ano do Ensino Fundamental"
        } else if (schoolYear == "8F") {
            return "8° Ano do Ensino Fundamental"
        } else if (schoolYear == "9F") {
            return "9° Ano do Ensino Fundamental"
        } else if (schoolYear == "1M") {
            return "1° Ano do Ensino Médio"
        } else if (schoolYear == "2M") {
            return "2° Ano do Ensino Médio"
        } else if (schoolYear == "3M") {
            return "3° Ano do Ensino Médio"
        }
    }
}