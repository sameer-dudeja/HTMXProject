const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {

    const limit = +req.query.limit || 30;

    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`)
    const users = await response.json()

    res.send(`
        <h1 class="text-2xl font-bold my-4"> Users </h1>
        <ul>
            ${users.map((user) => `<li>${user.name}</li>`).join('')}
        </ul>
    `)
})

module.exports = router