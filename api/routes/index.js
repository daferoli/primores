const router = require('express').Router();
const eventRoutes = require('api/routes/event');

router.use('/events', eventRoutes);

router.get('/test', function(req, res) {
    res.status(200).send('Hello, World!');
});

module.exports = router;
