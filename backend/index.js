import express from "express"
import cors from "cors"
import fetch from "node-fetch"
import dotenv from "dotenv"

import {initializeApp} from "firebase/app";
import {getFirestore, doc, getDoc} from "firebase/firestore"

const PORT = process.env.PORT || 3002;
const firebaseConfig = {
    apiKey: "AIzaSyBV5v7TZokHjIzlJjSNreNbaqlsAGl1Dns",
    authDomain: "pokedex-a5642.firebaseapp.com",
    projectId: "pokedex-a5642",
    storageBucket: "pokedex-a5642.appspot.com",
    messagingSenderId: "21220076380",
    appId: "1:21220076380:web:03410ab538f0867dfe6f99",
    measurementId: "G-XVRXYBYD7V"
  };
dotenv.config()
const app = express();
const fbapp = initializeApp(firebaseConfig)
const db = getFirestore(fbapp)


app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
            const url = `http://localhost:${PORT}/`
            console.log(`Server is running on ${url}`)
        })


app.post("/teamapi", async( req, res) => {
    let KantoList = []
    let email = JSON.stringify(req.body.userid)
    email = email.replace(/['"]+/g, '')
    let teamRef = doc(db, "team", email);
    const docSnap = await (getDoc(teamRef))
    if (docSnap.exists()){
        let teamarray = docSnap.get('poketeam')
        for (var i = 0; i < teamarray.length; i++){
            await searchPokemon(teamarray[i], KantoList)
        }
    }
    else{
        console.log("That document doesn't exist")
    }

    res.json(KantoList)
})


app.get("/api/:value", async (req, res) => {
    let KantoList = []
    let x = req.params.value
    x = parseInt(x)
    let limit = x + 24;
    for (; x < limit; x++){
        console.log(x)
        await searchPokemon(x, KantoList)
    }
    res.json(KantoList)})

app.post("/searchPokemon", async (req, res) => {
    let KantoList = []
    let pokename = JSON.stringify(req.body.name)
    pokename = pokename.toLowerCase()
    await getEvoChain(pokename, KantoList);
    res.json(KantoList)
})

const getEvoChain = async(pokemonname, KantoList) => {
    pokemonname = pokemonname.replace(/[':"]+/g, '')
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonname}`
    try{
        const res = await fetch(url);
        const jsonres = await res.json();
        try{
            const url2  = jsonres.evolution_chain.url
            const res2 = await fetch(url2);
            const jsonres2 = await res2.json()
            await searchPokemon(jsonres2['chain']['species']['name'], KantoList)
            if (jsonres2['chain']['evolves_to'].length > 0){
                await searchPokemon(jsonres2['chain']['evolves_to']['0']['species']['name'], KantoList)
                if (jsonres2['chain']['evolves_to']['0']['evolves_to'].length > 0){
                    await searchPokemon(jsonres2['chain']['evolves_to']['0']['evolves_to']['0']['species']['name'], KantoList)
                }
            }
        }
        catch(error){
            console.log(error)
        }
    }
    catch(error){
        console.log(error)
    }
}



const searchPokemon = async (pokemonname, Kantolist) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonname}`
    try{
        const res = await fetch(url);
        const jsonres = await res.json();
        let KantoDict= {}
        KantoDict["id"] = jsonres.id
        const pokename = jsonres.name.charAt(0).toUpperCase() + jsonres.name.slice(1)
        KantoDict["name"] = pokename
        KantoDict["sprite"] = jsonres['sprites']['other']["official-artwork"]['front_default']
        KantoDict["sprite2"] = jsonres['sprites']['front_default']
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
        KantoDict["stats2"] = [(jsonres.stats[0].base_stat/120)*100,(jsonres.stats[1].base_stat/120)*100,
            (jsonres.stats[2].base_stat/120)*100,(jsonres.stats[3].base_stat/120)*100,(jsonres.stats[4].base_stat/120)*100,
            (jsonres.stats[5].base_stat/120)*100,]
        Kantolist.push(KantoDict)
    }
    catch(error){
        console.log(error)}
    }
    
const getPokemon = async (x, KantoList) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${x}`
    const res = await fetch(url);
    const jsonres = await res.json();
    let KantoDict= {}
    KantoDict["id"] = x
    const pokename = jsonres.name.charAt(0).toUpperCase() + jsonres.name.slice(1)
    KantoDict["name"] = pokename
    KantoDict["sprite"] = jsonres['sprites']['other']["official-artwork"]['front_default']
    KantoDict["sprite2"] = jsonres['sprites']['front_default']
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
    KantoDict["stats2"] = [(jsonres.stats[0].base_stat/120)*100,(jsonres.stats[1].base_stat/120)*100,
        (jsonres.stats[2].base_stat/120)*100,(jsonres.stats[3].base_stat/120)*100,(jsonres.stats[4].base_stat/120)*100,
        (jsonres.stats[5].base_stat/120)*100,]
    KantoList.push(KantoDict)
}