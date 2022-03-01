<script lang = "ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'app',
  components: {},
  data(){
    return {
      getResult: String
    }
  },
  methods: {
    formatResponse(res){
      return JSON.stringify(res, null, 2);
    }
    async getPokemon(){
      try{
        const res = await fetch(`http://localhost:3002/api`);
        if (!res.ok) {
          const message = `u fucked up`
          throw new Error(message);
        }
        const data = await res.json();
        this.getResult = data;
      }
      
    }
  }
})
</script>

<template>
<div class= "app">
  <h1>pokename</h1>
    <div>
    {{$data}}
    </div>
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
