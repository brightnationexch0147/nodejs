const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
    const locals = {
        title: 'Nodejs Blog App',
        description: 'A Nodejs Blog App build with Nodejs, Express and MongoDB'
    };
    res.render('index', {locals} );
});

module.exports = router