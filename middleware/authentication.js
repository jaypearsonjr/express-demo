function authenticate(req, re, next) {
    console.log('Authenticating...');
    next();
}

module.exports = authenticate;