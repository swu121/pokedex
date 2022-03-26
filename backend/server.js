import express from "express"
import cors from "cors"
import fetch from "node-fetch"
import bycrypt from "bcrypt"
import mongodb from "mongodb"
import dotenv from "dotenv"
import UsersDAO from "./dao/usersDAO.js"


const PORT = process.env.PORT || 3002;
const users = [];
let x  = 1;
const app = express();
const MongoClient = mongodb.MongoClient

app.use(cors());
app.use(express.json());
dotenv.config()


MongoClient.connect(
    process.env.POKEDEX_DB_URI,
    {
        maxPoolSize: 40, 
        wtimeoutMS: 2500,  
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        await UsersDAO.injectDB(client);
        app.listen(PORT, () => {
            const url = `http://localhost:${PORT}/`
            console.log(`Server is running on ${url}`)
        })
    })


app.use("/api", async (req, res) => {
    let KantoList = []
    let limit = x + 20;
    for (; x < limit; x++){
        console.log(x)
        await getPokemon(x, KantoList)
    }
    res.json(KantoList)})
 
app.get('/users', (req, res) =>{
    res.json(users);
})


app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bycrypt.hash(req.body.password, 10)
        const user = {name: req.body.name, password: hashedPassword}
        users.push(user)
        const userResponse = await UsersDAO.addUser(req.body.name, hashedPassword)
        console.log(userResponse)

        res.json({status: "we added a user"})
    }
    catch{
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {
    const user2 = await UsersDAO.findUser(req.body.name)
    if (user2 == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bycrypt.compare(req.body.password, user.password)){
            res.send('Success')
        }
        else{
            res.send('Incorrect')
        }
    }
    catch{
        res.status(500).send()
    }
})

const getPokemon = async (x, KantoList) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${x}`
    const res = await fetch(url);
    const jsonres = await res.json();
    let KantoDict= {}
    KantoDict["id"] = x
    const pokename = jsonres.name.charAt(0).toUpperCase() + jsonres.name.slice(1)
    KantoDict["name"] = pokename
    KantoDict["sprite"] = jsonres['sprites']['other']["official-artwork"]['front_default']
    if (jsonres.types.length > 1) {
        KantoDict["types"] = [jsonres.types[0].type.name, jsonres.types[1].type.name]
    }
    else{
        KantoDict["types"] = [jsonres.types[0].type.name]
    }
    KantoDict["height"] = jsonres.height
    KantoDict["weight"] = jsonres.weight
    KantoDict["stats"] = [jsonres.stats[0].base_stat, jsonres.stats[1].base_stat,
        jsonres.stats[2].base_stat, jsonres.stats[3].base_stat,
        jsonres.stats[4].base_stat, jsonres.stats[5].base_stat]
    KantoList.push(KantoDict)
}