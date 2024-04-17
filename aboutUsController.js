const express = require('express');
const router = express.Router();

exports.aboutUsView = (req, res) => {
    res.render('aboutUs.ejs');
};

router.get('/', exports.aboutUsView);

exports.router = router;
