const express = require('express')

const router = express.Router()

router.post('/', async (req, res) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const users = await response.json()

    const searchQuery = req.body.search.toLowerCase();
    if (!searchQuery) {
        return res.send('<tr></tr>')
    }
    const searchResults = users.filter((user) => {
        const name = user.name.toLowerCase()
        const email = user.name.toLowerCase()

        return (
            name.includes(searchQuery) || email.includes(searchQuery)
        )
    })
    const searchResultHtml = searchResults
        .map(
            (contact) => `
      <tr>
        <td><div class="my-4 p-2">${contact.name}</div></td>
        <td><div class="my-4 p-2">${contact.email}</div></td>
      </tr>
    `
        )
        .join('');

    res.send(searchResultHtml);
})

module.exports = router