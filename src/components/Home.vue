<template>
    <div>
        <h1 class="title"> Hello, {{userData.name}} </h1>
        <div id="left-column">
            <!-- Website stats here -->
            <section id='stats'>
                <div id="stats-left">
                    <p style="font-size: 30px; margin-left: 10%; margin-top: 2%">
                        {{itemsExchanged}}
                    </p>
                    <p style="font-size: 20px; margin-left: 10%;">
                        Items Exchanged
                    </p>
                </div>
                <div id="stats-right">
                    <p style="font-size: 30px; margin-left: 10%; margin-top: 2%">
                        {{eventsHosted}}
                    </p>
                    <p style="font-size: 20px; margin-left: 10%;">
                        Events Hosted
                    </p>
                </div>
            </section>


            <GmapMap id="GmapMap"
                     :center="{lat:1.2985489, lng:103.77496}"
                     :zoom="16"
                     map-type-id="terrain"
            >
                <!-- style="width: 800px; height: 500px; border-radius:20px margin-left:auto margin-right:auto" -->
                <GmapMarker
                    :key="index"
                    v-for="(m, index) in this.markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="false"
                    :title="m.title"
                    @click="toggleInfoWindow(m,index)"
                />
                <gmap-info-window
                    :options="infoOptions"
                    :position="infoWindowPos"
                    :opened="infoWinOpen"
                    @closeclick="infoWinOpen=false"
                >
                    <div v-html="infoContent"></div>
                </gmap-info-window>
            </GmapMap>
        </div>

        <div id="right-column">
            <span id="newlyListedItems" > Newly Listed Items </span>
            <span  id="seeAll1" v-on:click="routeExchange()"> See all > </span>

            <div id="itemsList">
                <div class="item" v-for="item in itemsList" v-bind:key="item.name">
                    <img class="itemImage" v-bind:src=item.imageURL>
                    <p class="itemName">{{formatItemName(item.name)}}</p>
                </div>
            </div>
            <br>

            <span id="eventHeading"> Upcoming Events </span>
            <span id="seeAll2" v-on:click="routeEvent()">See all ></span>

            <div id="eventsList">
                <div class="event" v-for="event in eventsList" v-bind:key="event.name">
                    <p id="eventDate">{{formatDate(event.date)}} {{event.time}} </p>
                    <p id="eventName">{{formatEventName(event.title)}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase";
import moment from "moment";

export default {
    data() {
        return {
            itemsList: [],
            eventsList : [],
            userData:null,
            itemsExchanged: 0,
            eventsHosted: 0,
            markers : [],
            infoContent: '',
            infoWindowPos: {
                lat: 0,
                lng: 0
            },
            infoWinOpen: false,
            currentMidx: null,
            //optional: offset infowindow so it visually sits nicely on top of our marker
            infoOptions: {
                pixelOffset: {
                    width: 0,
                    height: -35
                }
            },
        }
    },

    methods: {
      fetchUserData() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    let docRef = db.collection('users').doc(user.uid)
                    docRef.get().then(doc => {
                        this.userData = doc.data();
                    })
                } else {
                    this.$router.push({path: "/settings/login"});
                }
            });
        },

        fetchWebsiteStats() {
            let docRef = db.collection('stats').doc('Apr');
            docRef.get().then(doc => {
                let data = doc.data()
                this.itemsExchanged = data.itemsExchanged
                this.eventsHosted = data.eventsHosted
            })
        },
    
        fetchItems:function(){
            db.collection('items').get().then((querySnapShot)=>{
                    let item={}
                    querySnapShot.forEach(doc=>{
                        item=doc.data()
                        item.id=doc.id
                        this.itemsList.push(item) 
                    })      
                })    
        },

        fetchEvents: function() {
            db.collection('events').get().then(
                (querySnapshot) => { 
                    var temp = {}
                    querySnapshot.forEach( x=> {
                        temp = x.data()
                        temp.id = x.id
                        this.eventsList.push(temp)
                        this.markers.push({
                            position: {
                                lat: temp.lat,
                                lng: temp.long 
                            },
                            title: temp.title,
                            date: temp.date,
                            time: temp.time
                        }
                    )
                })
            })
            console.log(this.eventsList)
            console.log("markers coords are...")
            console.log(this.markers)
        },
        routeExchange: function() {
            this.$router.push({ path: "/exchange"})
        },

        routeEvent: function() {
            this.$router.push({ path: "/events"})
        },

        formatItemName(name) {
            if(name.length > 10) {
                return name.slice(0, 11).trim() + "..."
            } else {
                return name;
            }
        },

        formatEventName(name) {
            if(name.length > 15) {
                return name.slice(0, 16).trim() + "..."
            } else {
                return name;
            }
        },

        formatDate(timestamp) {
          return moment.unix(timestamp.seconds).format("MM/DD/YYYY")
        },
        toggleInfoWindow: function (marker, idx) {
            console.log("toggling infowindow...")
            this.infoWindowPos = marker.position;
            this.infoContent = this.getInfoWindowContent(marker);
            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == idx) {
                this.infoWinOpen = !this.infoWinOpen;
            }   
            //if different marker set infowindow to open and reset current marker index
            else {
            this.infoWinOpen = true;
            this.currentMidx = idx;
            }
        },
        getInfoWindowContent: function (marker) {
            return (
                `<div class="card">
                    <div class="card-content">
                        <h3>
                        ${marker.title}
                        </h3>
                        ${this.formatDate(marker.date)} <br>
                        ${marker.time}
                    </div>
                </div>`);
        },
    },
    created() {
        this.fetchUserData();
        this.fetchWebsiteStats();
        this.fetchItems();
        this.fetchEvents();
    },
}
</script>

<style scoped>
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

#left-column {
    float: left;
    position: relative;
    margin-top: 30px;
    left: 50px;
    width: 42%;
    height: 56%;
    background: white;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 20px;
}

#right-column {
    float: left;
    position: absolute;
    margin-left: 48%;
    margin-top: 30px;
    width: 20%;
    height: 56%;

    background: white;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 15px;
    padding: 20px;
}

#stats {
    position: relative;
    height: 18%;
    top: 5%;
}

#stats-left {
    float: left;
    position: relative;
    width: 35%;
    height: 100%;
    top:3%;
    left: 7.5%;

    color: #42427D;
    background-color: #FFBB80;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px 10px;
}

#stats-right {
    float: left;
    position: relative;
    width: 35%;
    height: 100%;
    top:3%;
    left: 22.5%;

    color: #42427D;
    background-color: #FFBB80;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px 50px;
}

#itemsList {
    position: relative;
    width: 100%;
    height: 45%;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 10px;

    overflow-y: scroll;
    overflow-x: hidden;
}
#itemsList::-webkit-scrollbar {
    background: transparent;
}

.item {
    position: relative;
    margin-top: 2.5%;
    left: 2.5%;
    width: 97%;
    height: 30%;
    background: #FFBB80;

    border-width: 0px;
    border-radius: 15px;
}

.itemImage {
    position: relative;
    top: 5px;
    left: 5px;
    border-radius: 12px;
    width: 65px;
    height: 62px;
}

.itemName {
    position: relative;
    left: 80px;
    top: -50px;
    font-size: 20px;
}

#eventsList {
    position: relative;
    width: 100%;
    height: 45%;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 10px;

    overflow-y: scroll;
    overflow-x: hidden;
}
#eventsList::-webkit-scrollbar {
    background: transparent;
}

.event {
    position: relative;
    margin-top: 2.5%;
    left: 2.5%;
    width: 97%;
    height: 30%;
    background: #FFBB80;

    border-width: 0px;
    border-radius: 15px;
}

#eventDate {
    position: relative;
    left: 10px;
    top: 5px;
    font-size: 14px;
}

#eventName {
    position: relative;
    left: 10px;
    top: 0px;
    font-size: 24px;
}

#newlyListedItems {
    position: relative;
    top:-10px;
    font-size: 16px;
    font-weight: bold;
}
#seeAll1 {
    position: relative;
    top: -10px;
    left: 55px;
    font-size: 16px;
    font-weight: bold;
}
#seeAll1:hover {
    cursor:pointer;
}

#eventHeading {
    position: relative;
    top:-10px;
    font-size: 16px;
    font-weight: bold;
}
#seeAll2 {
    position: relative;
    top:-10px;
    left: 67px;
    font-size: 16px;
    font-weight: bold;
}
#seeAll2:hover {
    cursor:pointer;
}

#GmapMap {
    width: 85%;
    height: 65%;
    top: 10%;
    margin:0px auto;

    border-width: 1px;
    border-style: groove;
}

section:after {
    content: "";
    display: table;
    clear: both;
}

</style>