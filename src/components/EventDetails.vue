<template>
    <div>
        <h1 class="title">Event Bulletin</h1>

        <div id='content'>
            <div class="leftColumn">
                <Button type="dashed" id="goBackButton" @click="$router.go(-1)">Back to Events</Button>
                <h1 id='eventTitle'> {{this.event.title}} </h1> <br>
                <h2 class='element'>Date: {{formatDate(event.date)}} </h2>
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

                <Button type="success" long id="attend-button" @click="rsvp"> RSVP </Button>

                <Button v-if="owner" type="error" class="deleteButton" @click="deleteEvent">
                    Delete This Posting
                </Button>
                <Button v-else type="error" disabled class="deleteButton" >
                    Delete This Posting
                </Button>

            </div>

            <div class="rightColumn">
                <h1 id='description-title'> Description: </h1><br>
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
import firebase from 'firebase'
import moment from "moment";


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
                //console.log("more details page EVENTS")
                var temp = {}
                //console.log(this.event_id)
                temp = snapshot.data()
                //console.log("temp = ")
                //console.log(temp)
                temp.id = snapshot.id
                this.event = temp
                //console.log("this.event = ")
                //console.log(this.event)
            })
        }, 

        deleteEvent:function() {
                database.collection("events").doc(this.event_id).delete().then(() => {
                    this.$Message.success(this.event.name + " is deleted!");
                    this.$router.go(-1)
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });

        },

        rsvp() {
            this.$Message.success("You have RSVPed this event")

            // Increase number of events attended for the user
            database.collection('users').doc(firebase.auth().currentUser.uid).update({
                eventsAttended: firebase.firestore.FieldValue.increment(1)
            })
        },

        formatDate(value) {
            return moment.unix(value.seconds).format("MM/DD/YYYY")
        },

        backToEvents: function() {
            this.$router.go(-1)
        }
    },
    created(){
        this.fetchItems()
    },
    computed: {
        google: gmapApi,

        owner() {
            if(firebase.auth().currentUser) {
                return (firebase.auth().currentUser.uid == this.event.userID)
            } else {
                return false
            }
        },
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
    width: 1100px;
    height: 577px;
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
    /*
    left: 40px;
    font-size: 20px;
    top: 10%;
    */

    top: 50px;
    left: 10px;
    margin: auto;
    width: 95%;
    height: 10%;
}

#description-body {
    position: relative;
    /*
    top: 10%;
    width: 70%;
    height: 70%;
    left: 30px;

     */

    margin-top: 30px;
    margin-left: 5px;
    width: 95%;
    height: 75%;

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
    width:40%;
    height: 32px;
    margin-top: 2%;
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
    width: 85%;
    height: 40%;
    margin:0px auto;

    border-width: 1px;
    border-style: groove;
}


.deleteButton {
    position: relative;
    width:40%;
    height: 32px;
    margin-top: 2%;
    margin-left: 30%;
}
</style>
