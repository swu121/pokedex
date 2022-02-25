<template>
<div class= "app">
  <h1>pokename</h1>
</div>
</template>


<script lang = "ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'app',
  components: {},
  data(){

  }
})

interface Pokemon {
  id: number;
  name: String;
  sprites: PokemonSprites;
}

interface PokemonSprites {
  back_default: string;
  front_default: string;
}
const getPokemon = async (id : number) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const formattedPokemon : Pokemon = await res.json();
  createPokemonCard(formattedPokemon);
  } 

const fillPokeList = async () =>{
  for (let i = 1; i < 150; i++){
    await getPokemon(i);
  }
}

const createPokemonCard = (formattedPokemon : Pokemon) => {
  const pokeElement = document.createElement('div');
  pokeElement.classList.add('pokemon-card');
  let pokeInnerName = `${formattedPokemon.name}`;
  pokeElement.innerHTML += pokeInnerName
  pokeElement.innerHTML += '<img src="'+ formattedPokemon.sprites.front_default+'"/>';
  document.body.append(pokeElement)
}

fillPokeList();
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
