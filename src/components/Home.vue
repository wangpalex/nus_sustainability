<template>
    <div>
        <h1 class="title"> Hello, {{userData.name}} </h1>
        <div id="left-column">
            <!-- Website stats here -->
            <div id="stats1">
                <p style="font-size: 36px; margin-left: 10%; margin-top: 8%">
                    {{itemsExchanged}}
                </p>
                <p style="font-size: 20px; margin-left: 10%;">
                    Items Exchanged
                </p>
            </div>
            <div id="stats2">
                <p style="font-size: 36px; margin-left: 10%; margin-top: 8%">
                    {{eventsHosted}}
                </p>
                <p style="font-size: 20px; margin-left: 10%;">
                    Events Hosted
                </p>
            </div>
        </div>

        <div id="middleBottom">
            <GmapMap id="GmapMap"
                :center="{lat:1.2985489, lng:103.77496}"
                :zoom="16"
                map-type-id="terrain"
                style="width: 800px; height: 500px; border-radius:20px; margin:0px auto"
                >
                <!-- style="width: 800px; height: 500px; border-radius:20px margin-left:auto margin-right:auto" -->
            </GmapMap>
        </div>

        <div id="right-column">
            <!-- Newly listed items -->
            <h1> Newly Listed Items </h1> 
            <p id="seeAll1" v-on:click="routeExchange()">See all ></p>
            <div id="itemsList">
                <ol>
                    <li id="item" v-for="item in itemsList" v-bind:key="item.name">
                        <img id="itemImage" v-bind:src=item.imageURL>
                        <h2 id="itemName">{{item.name}}</h2>                                                     
                    </li>
                </ol>
            </div>
            <h1 id="eventHeading"> Upcoming Events </h1> 
            <p id="seeAll2" v-on:click="routeEvent()">See all ></p>
            <div id="eventsList">
                <ol>
                    <li id="event" v-for="event in eventsList" v-bind:key="event.name">
                        <h2 id="eventDate">{{event.date}}</h2>  
                        <h2 id="eventName">{{event.title}}</h2>                                                     
                    </li>
                </ol>
            </div>
            <!-- Upcoming events -->

        </div>
    </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase";

export default {
    data() {
        return {
            itemsList: [],
            eventsList : [],
            userData:null,
            itemsExchanged: 0,
            eventsHosted: 0,
        }
    },

    methods: {
      fetchUserData() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    console.log("State change user log")
                    console.log(user)
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
            let docRef = db.collection('stats').doc('1');
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
                        }
                    )
                }
            )
        },
        routeExchange: function() {
            this.$router.push({ path: "/exchange"})
        },
        routeEvent: function() {
            this.$router.push({ path: "/events"})
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

#left-column  {
    position: relative;
    top:30px;
    float: left;
    width: 60%;
    height: 80%;


    border-color: aqua;
    border-style: dotted;
    border-width: 3px;

}

#middleBottom{
    position:fixed;
    top: 350px;
    left: 300px;
    float:left;
}
#right-column  {
    position: relative;
    top:30px;
    float: left;
    width: 30%;
    height: 80%;


    border-color: aquamarine;
    border-style: dotted;
    border-width: 3px;

}


#stats1 {
    float: left;
    position: relative;
    width: 25%;
    height: 15%;
    top:3%;
    left: 10%;

    color: #42427D;
    background-color: #FFBB80;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px 10px;
}

#stats2 {
    float: left;
    position: relative;
    width: 25%;
    height: 15%;
    top:3%;
    left: 30%;

    color: #42427D;
    background-color: #FFBB80;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px 50px;
}

#itemsList {
    position: relative;
    top: 0px; 
    width: 450px;
    height: 400px;
    border-style: dotted;
    border-color: black;
    border-width: 1px;
    border-radius: 60px;
}

#item {
    position: relative;
    top: 60px;
    left: 15px;
    width: 400px;
    height: 150px;
    background: #FBBC46;
    border-style: dotted;
    border-color: black;
    border-width: 1px;
    border-radius: 60px;
}

#itemImage {
    position: relative;
    top: 20px;
    left: 20px;
    border-radius: 20px;
    width: 110px;
    height: 110px;
}

#itemName {
    position: relative;
    left: 200px;
    top: -40px;
    font-size: 20px;
}

#eventHeading {
    position: relative;
    top: 40px;
    left: 10px;
}

#eventsList {
    position: relative;
    top: 20px; 
    width: 450px;
    height: 250px;
    border-style: dotted;
    border-color: black;
    border-width: 1px;
    border-radius: 60px;
}

#event {
    position: relative;
    top: 20px;
    left: 20px;
    width: 400px;
    height: 100px;
    background: #FBBC46;
    border-style: dotted;
    border-color: black;
    border-width: 1px;
    border-radius: 60px;
}

#eventDate {
    position: relative;
    left: 20px;
    top: 20px;
    font-size: 15px;
}

#eventName {
    position: relative;
    left: 20px;
    top: 22px;
    font-size: 23px;
}

#seeAll1 {
    position: relative;
    top: -30px;
    left: 320px;
    font-size: 20px;
}


#seeAll2 {
    position: relative;
    top: 10px;
    left: 320px;
    font-size: 20px;
}
</style>