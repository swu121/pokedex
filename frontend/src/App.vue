<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router"
import {auth} from "./firebase"


export default defineComponent({
  name: "App",
  data(){
    const router = useRouter();
    const route = useRoute();
    return {router, route}
  },
  beforeMount(){
    auth.onAuthStateChanged((user: any) => {
    if (user){
      if(this.route.path == '/register'){
        this.router.replace('/')
      }
    }
  }) 
  }
})
</script>

<style>
.app {
  height: 100%;
  width: 100%;
  background-color: black;
}

</style>