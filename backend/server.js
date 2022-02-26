import express from "express"
import cors from "cors"
import fetch from "node-fetch"

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3002, () => {
    console.log(`Server is running on port 3002`)
})

app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

let KantoDict= {}

const fetchPokemon = async() => {
    for (let i = 1; i < 5; i++){
        await getPokemon(i)
    }
}
const getPokemon = async x => {
    const url = `https://pokeapi.co/api/v2/pokemon/${x}`
    const res = await fetch(url);
    const jsonres = await res.json();
    console.log(jsonres.name)
    KantoDict["name"] = jsonres.name
    KantoDict["sprite"] = jsonres.sprites.front_default
    console.log(jsonres.types[0].type.name);
    KantoDict["types"] = jsonres.types
    console.log(KantoDict);
}

fetchPokemon();