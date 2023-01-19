<script setup lang = "ts">
import { onAuthStateChanged } from '@firebase/auth';
import { db, auth } from "../firebase/index"
import { doc, updateDoc, arrayUnion} from "firebase/firestore"
import router from '../router';

const props = defineProps<{
    id: number,
    name: string,
    sprite: string,
    sprite2: string,
    types: string[],
    height: number,
    weight: number, 
    stats: number[]
    stats2: number[]
}>()

async function addTeam(pokeid: number){
    onAuthStateChanged(auth, async (user) => {
    if (user){
        let email:string = user.email!
        await updateDoc(doc(db, "team", email), {
        poketeam: arrayUnion(pokeid)
        });
    }
    else{
        router.push('/login')
    }
    })
}

</script>

<template>
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <div style="text-align: right;">#{{props.id}}</div>
          <img class="card-img-top" v-bind:src = "props.sprite">
          <div class = "card-body" style = "padding: 0">
            <h5 class="card-title">{{props.name}}</h5>
            <p class="card-text">Type(s): {{props.types[0]}} {{props.types[1]}}<br>Height: {{props.height/10}} m <br>Weight: {{props.weight/10}} kgs</p>
          </div>
        </div>
        <div class="flip-card-back">
          <img class="front_img" v-bind:src = "props.sprite2">
          <h6>{{props.name}}</h6>
          <div class = "stats">
            <h6 class = "HP-tag">HP</h6>
            <div class="progress HPtag">
              <div class="progress-bar HPtag" role="progressbar" v-bind:style = "{width:props.stats2[0] + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{props.stats[0]}}</div>
            </div>
            <h6>ATK</h6>
            <div class="progress">
              <div class="progress-bar" role="progressbar" v-bind:style = "{width:props.stats2[1] + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{props.stats[1]}}</div>
            </div>
            <h6>DEF</h6>
            <div class="progress">
              <div class="progress-bar" role="progressbar" v-bind:style = "{width:props.stats2[2] + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{props.stats[2]}}</div>
            </div>
            <h6>SPATK</h6>
            <div class="progress">
              <div class="progress-bar" role="progressbar" v-bind:style = "{width:props.stats2[3] + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{props.stats[3]}}</div>
            </div>
            <h6>SPDEF</h6>
            <div class="progress">
              <div class="progress-bar" role="progressbar" v-bind:style = "{width:props.stats2[4] + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{props.stats[4]}}</div>
            </div>
            <h6>SPD</h6>
            <div class="progress">
              <div class="progress-bar" role="progressbar" v-bind:style = "{width:props.stats2[5] + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{props.stats[5]}}</div>
            </div>
          </div>
          <button type="button" class="btn btn-primary" @click="addTeam(props.id)">Catch</button>
        </div>
      </div>
</template>

<style>
.flip-card{
  border-style: hidden;
  background-color: transparent;
  width: 250px;
  height: 400px;
  perspective: 1000px;
  margin-bottom: 20px;
}

.flip-card-inner{
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.flip-card:hover .flip-card-inner{
  transform: rotateY(180deg);
}

.flip-card:hover .progress-bar{
  animation-name: progress;
  animation-duration: 1.5s;
}

.flip-card-front,
.flip-card-back {
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #222e36ef;
  color: white;
  position: absolute;
}

.flip-card-back {
  background-color: #222e36ef;
  color: white;
  transform: rotateY(180deg);
}

.stats{
  width: 90%;
  display: grid;
  row-gap: 10px;
  grid-template-columns: 25% 75%;
}

@keyframes progress{
  from{
    width: 0;
  }
}
</style>