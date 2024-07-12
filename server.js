import express from "express";

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//Handle get request to fetch users
app.get('/users', async (req, res) => {

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


//handle post request for temperature converter
app.post('/convert', async (req, res) => {

    let temp = parseFloat(req.body.fahrenheit);
    temp = (temp - 32) * (5 / 9);

    res.send(`
        <p class="text-center text-xl py-4">
            ${temp.toFixed(2)} &deg Celsius 
        </p>
        `)
})

let counter = 0;
//Handle GET request for Polling

app.get('/poll', (req, res) => {
    counter++;
    // res.send(`
    //     <p class="text-center text-xl">
    //         ${counter}
    //     </p>
    //     `)
})

app.get('/get-temperature', async (req, res) => {
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

//handle POST request for search user 
app.post('/search', async (req, res) => {
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


app.listen(3000, () => {
    console.log("Server is running on Port 3000")
})