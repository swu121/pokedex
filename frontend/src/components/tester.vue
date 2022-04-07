<template>
    <div class="my-div" v-if="totalParcels > 5">You have more than 5 items!</div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'


export default defineComponent({
    data() {
        return {
            totalParcels : 6
        }
    }
})
</script>