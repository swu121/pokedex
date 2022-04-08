<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <section class="vh-100" style="background-color: #black;">
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
            <div class="card" style="border-radius: 1rem;">
            <div class="row g-0">
                <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img
                    src="../assets/2020_loading_screen.jpg"
                    alt="login form"
                    class="img-fluid" style="border-radius: 1rem 0 0 1rem;"
                />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">

                    <form @submit.prevent = "Register">
                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Register your account</h5>

                    <div class="form-outline mb-4">
                        <input type="email" id="form2Example17" class="form-control form-control-lg" v-model = 'email' />
                        <label class="form-label" for="form2Example17">Email address</label>
                    </div>

                    <div class="form-outline mb-4">
                        <input type="password" id="form2Example27" class="form-control form-control-lg" v-model = 'password'/>
                        <label class="form-label" for="form2Example27">Password</label>
                    </div>

                    <div class="pt-1 mb-4">
                        <button class="btn btn-dark btn-lg btn-block" type="button" @click ="Register" >Register</button>
                    </div>
                    
                    <p class="mb-5 pb-lg-2" style="color: #393f81;">Don't have an account? <router-link to="/login">Login Here</router-link></p>
                    <a href="#!" class="small text-muted">Terms of use.</a>
                    <a href="#!" class="small text-muted">Privacy policy</a>
                    </form>

                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>
</template>

<script lang="ts">
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import router from '../router/index'
import { defineComponent, ref } from 'vue';
import {auth, db} from "../firebase"
import {collection, addDoc} from "firebase/firestore"


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
        Register() {
            console.log(this.email, this.password)
            createUserWithEmailAndPassword(this.author, this.email, this.password)
            .then((userCredential) => {
                const user = userCredential.user;
                this.addUser()
                router.push('/')
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
            });
        },
        async addUser() {
            try{
                const docRef = await addDoc(collection(db, "team"), {
                    username: this.email,
                    poketeam: []
                });
                console.log("Document written with ID: ", docRef.id);
                }
                catch(e){
                    console.error("Error adding document: ", e);
            }
        }
    }
})
</script>
<style>
</style>