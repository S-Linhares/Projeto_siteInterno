const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("exemplo/exemplo")
});

router.get('/exemplo_2', (req, res) => {
    res.send("Página de exemplos 2!");
});


module.exports = router;