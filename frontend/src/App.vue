<script lang = "ts">
import { defineComponent, ref } from 'vue';
import Pokemon from './types/pokemon'


export default defineComponent({
  name: 'Pokedex',
  data(){
    let x : number = 0;
    const pokearray = ref<Pokemon[]>([])
    this.getPokemon(x)
    console.log(pokearray)
    return {pokearray}

  },
  methods: {
    async getPokemon(){ 
      try{
        let res = await fetch(`http://localhost:3002/api`)
        let data = await res.json();
        for (let x :number =0; x<data.length; x++){
          this.pokearray.push(data[x])
        }
      }
      catch(error){
        console.log(error)
      }
    },
    getNextPokemon(){
      console.log('Im getting more shit')
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow){
          this.getPokemon()
        }
      }
    },
    toggle: function(card:Pokemon){
      card.flipped = !card.flipped;
    }
  },
  beforeMount(){
    this.getPokemon()
  },
  mounted(){
    this.getNextPokemon();
  }
})
</script>

<template>
<div class= "app">
  <h1>pokedex</h1>
  <div class = "pokedex">
    <div v-for="pokemon in pokearray" class = "flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img class="card-img-top" v-bind:src = "pokemon.sprite">
          {{pokemon.name}}
        </div>
        <div class="flip-card-back">
          <p>backshots</p>
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

.flip-card{
  border-style: hidden;
  background-color: transparent;
  width: 250px;
  height: 300px;
  perspective: 1000px;
}

.flip-card-inner{
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: white;
  color: black;
}

.flip-card-back {
  background-color: #222e36ef;
  color: white;
  transform: rotateY(180deg);
}

.pokedex{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;
  gap: 15px;
}
</style>