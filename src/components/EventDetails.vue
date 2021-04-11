<template>
    <div id='main-body'>
        <h1 id='event-bulletin'>Event Bulletin</h1>
        <div id='content'>
        <h1 id='title'> {{this.event.title}} </h1> <br>
            <h2 id='element'>Date: {{this.event.date}} </h2> 
            <h2 id='element'> Time: {{this.event.time}} <br> </h2>
            <h3 id='element'> Location: {{this.event.location}} <br> <br></h3>

            <GmapMap id="GmapMap"
                :center="{lat:event.lat, lng:event.long}"
                :zoom="17"
                map-type-id="terrain"
                style="width: 1200px; height: 400px; border-radius:20px; margin:0px auto"
                >
                <!-- style="width: 800px; height: 500px; border-radius:20px margin-left:auto margin-right:auto" -->
                <GmapMarker ref="myMarker"
                    :position="google && new google.maps.LatLng(event.lat, event.long)" />
            </GmapMap> <br>
            
            <h2 id='element'> Description: </h2><br>
            <p id='description-body'>{{this.event.description}}</p><br><br>

            <button id="attend-button"> Attend </button>
            <button id="go-back-button" @click="$router.go(-1)">Back to Events</button>
        </div>
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

#event-bulletin {
    position: relative;
    top: 20px;
    left: 50px;
    font-size: 40px;
    text-decoration: underline;
}


#title {
    position: relative;
    left: 50px;
    font-size: 40px;
    text-decoration: underline;
}

#content {
    position: relative;
    top: 30px;
    border-color: black;
    border-width: 1px;
    border-radius: 60px;
    border-style: solid;
    margin-right: 40px;
    margin-left: 40px;
}

#events {
    position: relative;
    top: 30px;
    left: 15px;
    width: 885px;
    height: 150px;
    background: #FBBC46;
    border-style: dotted;
    border-color: black;
    border-width: 1px;
    border-radius: 70px;
    margin:5px;
}

#element {
    position: relative;
    left: 50px;
    font-size: 22px;
}

#description-body {
    position: relative;
    left: 50px;
    margin-right: 60px;
    font-size: 22px;
}


#go-back-button {
    position: absolute;
    left: 90%;
    top: 5%;
}

#attend-button {
    position: absolute;
    left: 90%;
    top: 10%;
}


#eventName {
    position: relative;
    left: 65px;
    top: 15px;
    font-size: 22px;
    list-style-type: disc;
}

#details{
    position: relative;
    left: 65px;
    top: 15px;
    font-size: 16px;
}

</style>
