<script lang = "ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'app',
  components: {},
  data(){
    this.getPokemon()
    const name = ref('Bulb')
    const urlol = ref('https://m.media-amazon.com/images/I/81iB6EGUDLL._AC_UY445_.jpg')
    return {name, urlol}

  },
  methods: {
    async getPokemon(){ 
      try{
        let res = await fetch(`http://localhost:3002/api`);
        let data = await res.json();
        console.log(data)
        console.log(data[1].name)
        this.name = data[1].name
        this.urlol = data[1].sprite
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
  <h1>pokename</h1>
    <div>
    {{name}}
    </div>
    <img v-bind:src = "urlol">
</div>
</template>

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