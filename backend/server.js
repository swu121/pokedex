import express from "express"
import cors from "cors"
import pokemons from "./api/restaurants.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/")