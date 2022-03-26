<template>
    <div class = "login">
        <h1>Login</h1>
        <form @submit.prevent="Login">
            <input type="text" placeholder = "Email Address" v-model = 'email'/>
            <input type="password" placeholder = "Enter Password" v-model = 'password' />
            <input type="submit" value="Login">
            <p>Need an account? <router-link to="/register">Register Here</router-link></p>
        </form>
    </div>
</template>

<script lang="ts">
import firebase from 'firebase/compat/app'
import { defineComponent, ref } from 'vue';
import { getAuth, signInWithEmailAndPassword} from "firebase/auth"
// @ts-ignore
import { auth } from '../firebase'

export default defineComponent ({
    name: 'Login',
    data(){
        const email = ref("");
        const password = ref("");
        const author = auth
        return {
            author,
            email, 
            password
        }
    },

    methods:{
        Login(){
            signInWithEmailAndPassword(this.author, this.email, this.password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
            });
        }
    }
})
</script>
<style>
</style>