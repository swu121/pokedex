<script lang="ts">
import { PropType } from "vue"
import Pokemon from "../types/pokemon"
export default {
    name: 'PokeCard',
    props:{
        pokeobject: {
            type: Object as PropType<Pokemon>,
        }
    },
    data(){
        return{
            pokeobject
        }
    }
}
</script>

<template>
    <div class="card">
        <div class = "card-face is-front">
            {{props.name}}
        </div>
        <div class=" card-face is-back">
            <p>backshots</p>
        </div>
    </div>

</template>