<script lang = "ts">
import { defineComponent, ref } from 'vue';
import Pokemon from '../types/pokemon'
import Navbar from '../components/navbar.vue'
import { onAuthStateChanged } from '@firebase/auth';
import { doc, updateDoc, arrayRemove} from "firebase/firestore"
import { db, auth } from "../firebase/index"
import router from '../router';

export default defineComponent({
  name: 'myTeam',
  data(){
    const pokearray = ref<Pokemon[]>([])
    const boolvals : boolean[] = []
    console.log(pokearray)
    return {pokearray, boolvals}

  },
  components: {
    Navbar
  },
  methods: {
    fillboolval(){
      for (let x:number =0; x < this.pokearray.length; x++){
        this.boolvals.push(true);
      }
    },
    async getPokemon(){
      onAuthStateChanged(auth, async (user) => {
        if (user){
          console.log(user.getIdToken)
          let email:string = user.email!
          const settings = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userid: email,
            })
          }; 
          try{
            let res = await fetch(`http://localhost:3002/teamapi`, settings);
            let data = await res.json();
            for (let x :number =0; x<data.length; x++){
               this.pokearray.push(data[x])
               this.boolvals.push(true)
            }
          }
          catch(error){
            console.log(error)
          }
        }
        else{
          router.push('/login')
        }
      })
    },
    async removeTeam(pokeid: number, pokeindex: number){
      onAuthStateChanged(auth, async (user) => {
        if (user){
          let email:string = user.email!
          await updateDoc(doc(db, "team", email), {
            poketeam: arrayRemove(pokeid)
          });
          this.boolvals[pokeindex] = false;
        }
        else{
          router.push('/login')
        }
      })
    }
  },
  beforeMount(){
    this.getPokemon()
  },
})
</script>

<template>
  <Navbar></Navbar>
  <div class = "bg">
    <div v-for="(pokemon, index) in pokearray" class = "flip-card" v-show = boolvals[index] :key="pokemon.id">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <div style="text-align: right;">#{{pokemon.id}}</div>
          <img class="card-img-top" v-bind:src = "pokemon.sprite">
          <div class = "card-body" style = "padding: 0">
            <h5 class="card-title">{{pokemon.name}}</h5>
            <p class="card-text">Type(s): {{pokemon.types[0]}} {{pokemon.types[1]}}<br>Height: {{pokemon.height/10}} m <br>Weight: {{pokemon.weight/10}} kgs</p>
          </div>
        </div>
        <div class="flip-card-back">
          <div>
            <button type="button" class="btn btn-primary" @click="removeTeam(pokemon.id, index)">Release</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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

.bg{
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-items: center;
  gap: 5px;
  height: 100vh;
}

.flip-card{
  margin-bottom: 20px;
}
</style>