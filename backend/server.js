import express from "express"
import cors from "cors"
import fetch from "node-fetch"

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    const url = `http://localhost:${PORT}/`
    console.log(`Server is running on ${url}`)
})

app.use("/api", (req, res) => res.json(KantoList))
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

let KantoList = []
const fetchPokemon = async() => {
    for (let i = 1; i < 152; i++){
        await getPokemon(i)
    }
}
const getPokemon = async x => {
    const url = `https://pokeapi.co/api/v2/pokemon/${x}`
    const res = await fetch(url);
    const jsonres = await res.json();
    let KantoDict= {}
    KantoDict["id"] = x
    KantoDict["name"] = jsonres.name
    KantoDict["sprite"] = jsonres.sprites.front_default
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

const log = lister => {
    console.log(lister)
}
export default class PokemonCtrl{
    static async apiGetPokemons(req, res, next){
        res.KantoDict       
    }
}

fetchPokemon()
console.log(KantoList)