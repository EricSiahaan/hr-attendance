const prisma = require("../db");

const findAdminByEmailPassword = async (email, password) => {
    try {
        const data = await prisma.users.findMany({
            where: {
                email: email,
                password: password,
            },
        })
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    findAdminByEmailPassword
}