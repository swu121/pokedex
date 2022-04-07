<script lang = "ts">
import { defineComponent, ref } from 'vue';
import Pokemon from '../types/pokemon'
import Navbar from '../components/navbar.vue'


export default defineComponent({
  name: 'Pokedex',
  data(){
    let x : number = 0;
    const pokearray = ref<Pokemon[]>([])
    this.getPokemon(x)
    console.log(pokearray)
    return {pokearray}

  },
  components: {
    Navbar
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
  <Navbar></Navbar>
  <div class = "pokedex">
    <div v-for="pokemon in pokearray" class = "flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <div style="text-align: right;">#{{pokemon.id}}</div>
          <img class="card-img-top" v-bind:src = "pokemon.sprite">
          <div class = "card-body">
            <h5 class="card-title">{{pokemon.name}}</h5>
            <p class="card-text">Type(s): {{pokemon.types[0]}} {{pokemon.types[1]}}<br>Height: {{pokemon.height/10}} m <br>Weight: {{pokemon.weight/10}} kgs</p>
          </div>
        </div>
        <div class="flip-card-back">
          <div>
          stats
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
  color: white;
  background-color: black;
}

.flip-card{
  border-style: hidden;
  background-color: transparent;
  width: 250px;
  height: 400px;
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
  background-color: #222e36ef;
  color: white;
}

.flip-card-back {
  background-color: #222e36ef;
  color: white;
  transform: rotateY(180deg);
  display:grid;
  place-items: center;
}

.pokedex{
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-items: center;
  gap: 5px;
}

.flip-card{
  margin-bottom: 20px;
}
</style>