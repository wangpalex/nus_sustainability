<template>
    <div>
        <h1 class="title">Event Bulletin</h1>

        <div id='content'>
            <div class="leftColumn">
                <Button type="dashed" id="goBackButton" @click="$router.go(-1)">Back to Events</Button>
                <h1 id='eventTitle'> {{this.event.title}} </h1> <br>
                <h2 class='element'>Date: {{this.event.date}} </h2>
                <h2 class='element'> Time: {{this.event.time}} <br> </h2>
                <h3 class='element'> Location: {{this.event.location}} <br> <br></h3>

                <GmapMap id="GmapMap"
                         :center="{lat:event.lat, lng:event.long}"
                         :zoom="17"
                         map-type-id="terrain"
                >
                    <!-- style="width: 800px; height: 500px; border-radius:20px margin-left:auto margin-right:auto" -->
                    <GmapMarker ref="myMarker"
                                :position="google && new google.maps.LatLng(event.lat, event.long)" />
                </GmapMap> <br>

                <Button type="success" long id="attend-button"> RSVP </Button>
            </div>

            <div class="rightColumn">
                <h2 id='description-title'> Description: </h2><br>
                <div id='description-body'>
                    <div id="description-text">{{this.event.description}}</div>
                </div><br><br>
            </div>
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
.title {
    position: relative;

    left: 50px;
    top: 20px;

    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 58px;

    color: #42427D;
}

#goBackButton {
    position: relative;
    left:30px;
    top:10px;
}

.leftColumn {
    float:left;
    position: relative;
    width: 45%;
    height: 100%;
}
.rightColumn {
    float:left;
    position: relative;
    width: 50%;
    height: 100%;
}
#event-bulletin {
    position: relative;
    top: 20px;
    left: 50px;
    font-size: 40px;
    text-decoration: underline;
}


#eventTitle {
    position: relative;
    margin-top: 10px;
    margin-left: 30px;
    font-size: 30px;
    text-decoration: underline;
}

#content {
    position: relative;
    margin-top: 30px;
    left: 50px;
    width: 72%;
    height: 56%;
    background-color: white;
    border-color: black;
    border-width: 1px;
    border-radius: 20px;
    border-style: solid;
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

.element {
    position: relative;
    left: 40px;
    font-size: 20px;
}
#description-title {
    position: relative;
    left: 40px;
    font-size: 20px;
    top: 10%;
}

#description-body {
    position: relative;
    top: 10%;
    width: 70%;
    height: 70%;
    left: 30px;
    margin-right: 60px;

    border-style: dashed;
    border-width: 1px;
    border-radius: 15px;
    background: #FFBB80;
}

#description-text {
    position: relative;
    margin: 15px;
    font-size: 20px;
}

#attend-button {
    position: relative;
    width:30%;
    margin-top: 5%;
    margin-left: 30%;
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

#GmapMap {
    width: 80%;
    height: 40%;
    margin:0px auto;

    border-width: 1px;
    border-style: groove;
}
</style>
