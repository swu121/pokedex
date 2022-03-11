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

let x  = 1;
app.use("/api", async (req, res) => {
    let KantoList = []
    let limit = x + 20;
    console.log(limit)
    for (; x < limit; x++){
        console.log(x)
        await getPokemon(x, KantoList)
    }
    res.json(KantoList)})
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))
 

const getPokemon = async (x, KantoList) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${x}`
    const res = await fetch(url);
    const jsonres = await res.json();
    let KantoDict= {}
    KantoDict["id"] = x
    KantoDict["name"] = jsonres.name
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
    KantoDict["flipped"] = false
    KantoList.push(KantoDict)
}