<template>
    <div>
        <h1> {{this.event.title}} </h1> <br>
        <h2>Date: {{this.event.date}}  Time: {{this.event.time}} <br> </h2>
        <h3> Location: {{this.event.location}} <br> <br></h3>

        <GmapMap id="GmapMap"
            :center="{lat:event.lat, lng:event.long}"
            :zoom="17"
            map-type-id="terrain"
            style="width: 800px; height: 500px; border-radius:20px"
            >
            <GmapMarker ref="myMarker"
                :position="google && new google.maps.LatLng(event.lat, event.long)" />
        </GmapMap> <br>
        
        <h2> Description: </h2><br>
        {{this.event.description}} <br><br>

        <button> Attend </button>
        <p v-on:click="backToEvents">Back to Events</p>

        </div>
</template>

<script>
import database from '../firebase.js'
import {gmapApi} from 'vue2-google-maps'

export default {
    props: ['event_id'],
    data(){
        return{
            event : {}
        }
    },
    methods : {
        fetchItems: function(){
            database.collection('events').doc(this.event_id).get().then(snapshot =>{
                console.log("more details page EVENTS")
                var temp = {}
                console.log(this.event_id)
                temp = snapshot.data()
                console.log("temp = ")
                console.log(temp)
                temp.id = snapshot.id
                this.event = temp
                console.log("this.event = ")
                console.log(this.event)
            })
        }, 
        backToEvents: function() {
            this.$router.go(-1)
        }
    },
    created(){
        this.fetchItems()
    },
    computed: {
        google: gmapApi
    }
}
</script>

<style> 

</style>
