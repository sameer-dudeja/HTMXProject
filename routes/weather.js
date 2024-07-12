const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&minutely_15=temperature_2m`)
    const data = await response.json()

    res.send(`
        <p class="text-center bg-blue-600 rounded mx-auto py-auto">
            Latitude: ${data.latitude}
        </p>
        <p class="text-center bg-blue-600 rounded mx-auto py-auto">
            Longitude: ${data.longitude}
        </p>
        <p class="text-center bg-blue-600 rounded mx-auto py-auto">
            Elevation: ${data.elevation}
        </p>
        <table>
            <tr>
                <th>Time</th>
                <th>Temperature</th>
            </tr>
            ${data.minutely_15.time.map((time, index) => `
                <tr> 
                    <td> ${time} </td>
                    <td> ${data.minutely_15.temperature_2m[index]} </td>
                </tr>
                `).join('')}
        </table>
        `)
})

module.exports = router