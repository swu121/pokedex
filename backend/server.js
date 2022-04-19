import express from "express"
import cors from "cors"
import fetch from "node-fetch"
import bycrypt from "bcrypt"
import mongodb from "mongodb"
import dotenv from "dotenv"
import UsersDAO from "./dao/usersDAO.js"

import {initializeApp} from "firebase/app";
import {getAuth, getMultiFactorResolver} from "firebase/auth"
import {getFirestore, doc, getDoc} from "firebase/firestore"

const PORT = process.env.PORT || 3002;
const users = [];
let x  = 1;
const app = express();
const MongoClient = mongodb.MongoClient
const firebaseConfig = {
    apiKey: "AIzaSyBV5v7TZokHjIzlJjSNreNbaqlsAGl1Dns",
    authDomain: "pokedex-a5642.firebaseapp.com",
    projectId: "pokedex-a5642",
    storageBucket: "pokedex-a5642.appspot.com",
    messagingSenderId: "21220076380",
    appId: "1:21220076380:web:03410ab538f0867dfe6f99",
    measurementId: "G-XVRXYBYD7V"
  };

const fbapp = initializeApp(firebaseConfig)
const db = getFirestore(fbapp)


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

app.post("/teamapi", async( req, res) => {
    // authenticate user with jwot token 
    //let teamList = []
    // const docRef = doc(db, "teams", req.body.email)
    // const docSnap = await getDoc(docRef)

    // if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data())
    // }
    // //for numbers in pokedb.array: 
    let KantoList = []
    let email = JSON.stringify(req.body.userid)
    email = email.replace(/['"]+/g, '')
    let teamRef = doc(db, "team", email);
    const docSnap = await (getDoc(teamRef))
    if (docSnap.exists()){
        let teamarray = docSnap.get('poketeam')
        for (var i = 0; i < teamarray.length; i++){
            console.log(teamarray[i])
            await getPokemon(teamarray[i], KantoList)
        }
    }
    else{
        console.log("That document doesn't exist")
    }

    res.json(KantoList)
})


app.use("/api", async (req, res) => {
    let KantoList = []
    let limit = x + 24;
    for (; x < limit; x++){
        console.log(x)
        await getPokemon(x, KantoList)
    }
    res.json(KantoList)})
 

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
    KantoDict["stats2"] = [(jsonres.stats[0].base_stat/120)*100,(jsonres.stats[1].base_stat/120)*100,
        (jsonres.stats[2].base_stat/120)*100,(jsonres.stats[3].base_stat/120)*100,(jsonres.stats[4].base_stat/120)*100,
        (jsonres.stats[5].base_stat/120)*100,]
    KantoList.push(KantoDict)
}