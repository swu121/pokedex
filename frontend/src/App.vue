<script lang = "ts">
import { defineComponent, ref } from 'vue';
import Pokemon from './types/pokemon'
export default defineComponent({
  name: 'getPokemon',
  components: {},
  data(){
    this.getPokemon()
    const pokearray = ref<Pokemon[]>([])
    return {pokearray}

  },
  methods: {
    async getPokemon(){ 
      try{
        let res = await fetch(`http://localhost:3002/api`);
        let data = await res.json();
        this.pokearray = data
        console.log(data)
      }
      catch(error){
        console.log(error)
      }
    },
  }
})
</script>

<template>
<div class= "app">
  <h1>pokedex</h1>
  <div class = "row row-cols-1 row-cols-md-4 g-4">
    <div v-for="pokemon in pokearray" v-bind:key="pokemon.id" class="col">
      <div class="card">
        <img v-bind:src = "pokemon.sprite" class="card-img-top" alt="....">
          <div class = "pokecardbody">
            <h5 class="card-title">{{pokemon.name}}</h5>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  background-color: grey;
}


</style>