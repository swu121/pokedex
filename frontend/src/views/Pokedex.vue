<script lang = "ts">
import { defineComponent, ref } from 'vue';
import Pokemon from '../types/pokemon'
import Navbar from '../components/navbar.vue'
import { doc, updateDoc, arrayUnion} from "firebase/firestore"
import { db, auth } from "../firebase/index"
import { onAuthStateChanged } from '@firebase/auth';
import router from '../router';
import Pokecard from '../components/pokecard.vue'


export default defineComponent({
  name: 'Pokedex',
  data(){
    let x : number = 1;
    const pokearray = ref<Pokemon[]>([])

    return {x, pokearray}

  },
  components: {
    Navbar,
    Pokecard,
},
  methods: {
    async getPokemon(){ 
      try{
        let res = await fetch(`http://localhost:3002/api/` + this.x)
        let data = await res.json();
        for (let y :number =0; y<data.length; y++){
          this.pokearray.push(data[y])
        }
        this.x += 24
      }
      catch(error){
        console.log(error) 
      }
    },
    getNextPokemon(){
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow){
          this.getPokemon()
        }
      }
    },
    async addTeam(pokeid: number){
      onAuthStateChanged(auth, async (user) => {
        if (user){
          let email:string = user.email!
          await updateDoc(doc(db, "team", email), {
            poketeam: arrayUnion(pokeid)
          });
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
  mounted(){
    this.getNextPokemon();
  }
})
</script>

<template>
  <Navbar></Navbar>
  <div class = "pokedex">
    <div v-for="pokemon in pokearray" class = "flip-card" :key="pokemon.id">
      <Pokecard v-bind="pokemon"></Pokecard>
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
  height: 100%;
}

.pokedex{
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-items: center;
  gap: 5px;
}

.btn {
  margin-left: 10px;
  margin-right: 10px;
}

.btn-primary {
  font-family: Raleway-SemiBold;
  font-size: 13px;
  color: rgba(58, 133, 191, 0.75);
  letter-spacing: 1px;
  line-height: 15px;
  border: 2px solid rgba(58, 133, 191, 0.75);
  border-radius: 40px;
  background: transparent;
  transition: all 0.3s ease 0s;
}

.btn-primary:hover {
  color: #FFF;
  background: rgba(58, 133, 191, 0.75);
  border: 2px solid rgba(58, 133, 191, 0.75);
}

</style>