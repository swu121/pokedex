<script lang="ts">
import { PropType } from "vue"
import { defineComponent, ref } from 'vue';
import Pokemon from "../types/pokemon"
export default {
    name: 'Pokecard',
    props: ref<Pokemon>(),
    data(){
        let pokemon = this.props
        return pokemon
    }
}
</script>

<template>
    <div class = "flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-back">
          <div style="text-align: right;">#{{pokemon.id}}</div>
          <img class="card-img-top" v-bind:src = "pokemon.sprite">
          <div class = "card-body">
            <h5 class="card-title">{{pokemon.name}}</h5>
            <p class="card-text">Type(s): {{pokemon.types[0]}} {{pokemon.types[1]}}<br>Height: {{pokemon.height/10}} m <br>Weight: {{pokemon.weight/10}} kgs</p>
          </div>
        </div>
        <div class="flip-card-front">
          <div>
            <button type="button" class="btn btn-primary" @click="addTeam(pokemon.id)">Add to Team</button>
          </div>
        </div>
      </div>
    </div>
</template>