import express from "express"
import PokemonCtrl from "./PokemonController"
const router = express.Router()

router.route("/").get(PokemonCtrl.apiGetPokemons)
router.route("/pokemon/:id").get(PokemonCtrl.apiGetPokemonByID)

export default router