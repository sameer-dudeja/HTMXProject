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
    temp = (temp-32) * (5/9);

    res.send(`
        <p class="text-center text-xl">
            ${temp}
        </p>
        `)


})


app.listen(3000, () => {
    console.log("Server is running on Port 3000")
})