const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
    // after sending request, it will output http://localhost:5000/api/members each time
}

module.exports = logger;