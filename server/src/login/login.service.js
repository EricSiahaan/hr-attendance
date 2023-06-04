const {
    findAdminByEmailPassword
} = require('./login.repository')

const loginAdmin = async () => {
    const data = await findAdminByEmailPassword()

    return data;
}

module.exports = {
    loginAdmin
};