<script lang = "ts">

import { onAuthStateChanged } from '@firebase/auth';
import { defineComponent, ref } from 'vue';
import { auth } from '../firebase'
import router from '../router';

export default defineComponent({
    name: 'navbar',
    data(){
        let user : any = null
        let userStatus = ref(false);
        let pokename = ref('')
        return {
            userStatus,
            user,
            pokename
        }
    },

    methods:{
        Logout(){
            auth.signOut()
            .then(() => console.log("Signed Out"))
            .catch(err => alert(err.message))
            router.push('/')
        },
        shareData(){
            console.log(this.pokename)
            router.push('/search' + this.pokename)
        }
    },
    
    created(){
        onAuthStateChanged(auth, user => {
            if (user){
                this.userStatus = true
            }
            else{ 
                this.userStatus = false
            }
        })
        }

})

</script>

<template>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Pokedex</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item">
            <router-link to="/" class = "nav-link">Home</router-link>
        </li>
        <li class="nav-item" v-if="userStatus === false">
             <router-link to="/login" class = "nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="userStatus === true">
            <a class="nav-link" href="#" @click = "Logout">Logout</a>
        </li>
        <li class="nav-item" v-if="userStatus === true">
             <router-link to="/myteam" class = "nav-link">My Team</router-link>
        </li>
        </ul>
    <form class="form-inline my-2 my-lg-0">
      <input v-on:keyup.enter="shareData" class="form-control mr-sm-2" type="search" placeholder="Pokemon Name" aria-label="Search" v-model = "pokename">
      <button class="btn btn-outline-success my-2 my-sm-0" @click = "shareData">Search</button>
    </form>
    </div>
    </nav>
</template>

<style>
.bg-dark{
    background-color: #222e36ef!important;
}
</style>