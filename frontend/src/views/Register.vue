<template>
    <div class = "register">
        <h1>Register</h1>
        <form @submit.prevent="Register">
            <input type="text" placeholder = "Email Address" v-model = 'email'/>
            <input type="password" placeholder = "Enter Password" v-model = 'password' />
            <input type="submit" value='Register'>
            <p>Have an account? <router-link to="/login">Login Here</router-link></p>
        </form>
    </div>
</template>

<script lang="ts">
import firebase from 'firebase/compat/app'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { defineComponent, ref } from 'vue';
// @ts-ignore
import { auth } from '../firebase'

export default defineComponent ({
    name: 'Register',
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
        Register(){
            createUserWithEmailAndPassword(this.author, this.email, this.password)
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