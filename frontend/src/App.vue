<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router"
import {initializeApp} from "firebase/app";
import {auth} from "./firebase"


export function appRun(){
  const router = useRouter();
  const route = useRoute();
  
  onBeforeMount(() => {
    auth.onAuthStateChanged((user: any) => {
      if (user){
        if(route.path == '/register'){
          router.replace('/')
        }
      }
    })
  })
}
 

</script>
