<script lang = "ts">
import { defineComponent, ref } from 'vue';
import Pokemon from '../types/pokemon'
import Navbar from '../components/navbar.vue'

export default defineComponent({
  name: 'search',
  props: {
    id: String
  },
  data(){
    const searchval = this.$route.params.id
    const pokearray = ref<Pokemon[]>([])
    console.log(pokearray)
    return {pokearray, searchval}
  },
  components: {
    Navbar
  },
  methods: {
    async getPokemon(){
      const settings = {
        method: 'POST',  
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.$route.params.id
        })
      };
      try{
        let res = await fetch(`http://localhost:3002/searchPokemon`, settings);
        let data = await res.json();
        for (let x :number =0; x<data.length; x++){
          this.pokearray.push(data[x])
        }
      }
      catch(error){
          console.log(error)
      }
    }
  },
    beforeMount(){
    this.getPokemon()
    const searchval = this.$route.params.id
  },
})
</script>

<template>
  <Navbar></Navbar>
  <h1 v-if = "pokearray.length > 0" v-bind:style="{'margin-top': '50px'}">{{searchval}} Evolution Line</h1>
  <h1 v-else v-bind:style="{'margin-top': '50px'}">No search results found for {{searchval}}</h1>
  <div class = "background" v-bind:style="[pokearray.length > 1 ? pokearray.length > 2 ? {'grid-template-columns': 'repeat(3, 1fr)'} : {'grid-template-columns': 'repeat(2, 1fr)'} : {'grid-template-columns': 'repeat(1, 1fr)'}]" >
    <div class = "flip-card" v-for="pokemon in pokearray">
      <div class="flip-card-inner"> 
        <div class="flip-card-front">
          <div style="text-align: right;">#{{pokemon.id}}</div>
          <img class="card-img-top" v-bind:src = 'pokemon.sprite'>
          <div class = "card-body" style = "padding: 0">
            <h5 class="card-title">{{pokemon.name}}</h5>
            <p class="card-text">Type(s): {{pokemon.types[0]}} {{pokemon.types[1]}}<br>Height: {{pokemon.height/10}} m <br>Weight: {{pokemon.weight/10}} kgs</p>
          </div>
        </div>
        <div class="flip-card-back">
          <img class="front_img" v-bind:src = "pokemon.sprite2">
          <h6>{{pokemon.name}}</h6>
          <div class = "stats">
            <h6 class = "HP-tag">HP</h6>
            <div class="progress HPtag">
              <div class="progress-bar HPtag" role="progressbar" v-bind:style = "{width:pokemon.stats2[0] + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{pokemon.stats[0]}}</div>
            </div>
            <h6>ATK</h6>
            <div class="progress">
              <div class="progress-bar" role="progressbar" v-bind:style = "{width:pokemon.stats2[1] + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{pokemon.stats[1]}}</div>
            </div>
            <h6>DEF</h6>
            <div class="progress">
              <div class="progress-bar" role="progressbar" v-bind:style = "{width:pokemon.stats2[2] + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{pokemon.stats[2]}}</div>
            </div>
            <h6>SPATK</h6>
            <div class="progress">
              <div class="progress-bar" role="progressbar" v-bind:style = "{width:pokemon.stats2[3] + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{pokemon.stats[3]}}</div>
            </div>
            <h6>SPDEF</h6>
            <div class="progress">
              <div class="progress-bar" role="progressbar" v-bind:style = "{width:pokemon.stats2[4] + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{pokemon.stats[4]}}</div>
            </div>
            <h6>SPD</h6>
            <div class="progress">
              <div class="progress-bar" role="progressbar" v-bind:style = "{width:pokemon.stats2[5] + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{pokemon.stats[5]}}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style>
.background{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  gap: 5px;
  height: 100vh;
  align-items: center;
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

.flip-card{
  margin-bottom: 20px;
}
</style>