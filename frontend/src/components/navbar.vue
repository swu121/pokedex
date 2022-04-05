<script lang = "ts">

import { defineComponent, ref } from 'vue';
import { auth } from '../firebase'

export default defineComponent({
    name: 'navbar',
    data(){
        const user : any = null
        const userStatus = ref(false);
        return userStatus.value, user
    },

    methods:{
        Logout(){
            auth.signOut()
            .then(() => console.log("Signed Out"))
            .catch(err => alert(err.message))
        }
    },
    
    beforeMount(){
        this.user = auth.currentUser;
        if (this.user){
            this.userStatus = true
        }

    }
})



</script>

<template>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<nav class="navbar navbar-expand-lg navbar-light bg-dark">
    <a class="navbar-brand" href="#">Pokedex</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
             <router-link to="/login" class = "nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="userStatus">
            <a class="nav-link" href="#" value = 'Logout'>Logout</a>
        </li>

        </ul>

    </div>
    </nav>
</template>

<style>
.bg-dark{
    background-color: #222e36ef!important;
}
</style>