<script lang = "ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'app',
  components: {},
  setup(){
    const name = ref('Bulb')
    const urlol = ref('https://m.media-amazon.com/images/I/81iB6EGUDLL._AC_UY445_.jpg')
    return { name, urlol}
  },
  methods: {
    async getPokemon(){
      try{
        const res = await fetch(`http://localhost:3002/api`);
        if (!res.ok) {
          const message = `u fucked up`
          throw new Error(message);
        }
        const data = await res.json();
        console.log(data)
        this.name = data.name;
        this.urlol = data.url
      }
      catch(err){}
    }
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