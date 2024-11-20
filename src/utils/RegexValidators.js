const dsoEmailRegex = /^[a-zA-Z0-9._%+-]+@dso\.org\.sg$$/;

function isValidDSOEmail(email) {
    return dsoEmailRegex.test(email);
}

module.exports = { isValidDSOEmail }