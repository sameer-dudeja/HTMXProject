const express = require('express')

const router = express.Router()

router.post('/', async (req, res) => {

    let temp = parseFloat(req.body.fahrenheit);
    temp = (temp - 32) * (5 / 9);

    res.send(`
        <p class="text-center text-xl py-4">
            ${temp.toFixed(2)} &deg Celsius 
        </p>
        `)
})

module.exports = router