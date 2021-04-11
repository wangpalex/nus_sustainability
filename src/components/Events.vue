<template>
    <div>
        <h1 id="title">Events Bulletin</h1>
        <div id = "main">
            <ol class = "ol">
                <li v-for ="i in eventsList" :key="i.id" id="events">
                    <ul><li id = "eventName"><h3>{{i.title}}</h3></li></ul>
                    <div id ="details">
                    Location: {{i.location}} <br>
                    Date: {{i.date}} <br>
                    Time: {{i.time}} <br>
                    </div>
                    <h1 v-on:click="moreDetails($event)" v-bind:id=i.id class = "moreDetails">More Details ></h1>
                </li>
                    
            </ol>
        </div>
        <div id="form">
            <h2 id="head"> Submit your own event </h2>
            <div id="newEvent">
                <div id="name">
                    <label for="eventName" id="nameLabel">Event Name:</label>
                    <input type="text" id="eventName" name="eventName" v-model.lazy="event.title" required>
                </div> <br>
                <div id="date">
                    <label for="eventDate" id="dateLabel">Date:</label>
                    <input type="date" id="eventDate" name="eventDate" v-model.lazy="event.date" required>
                </div> <br>
                <div id="time">
                    <label for="eventTime" id="timeLabel">Time:</label>
                    <input type="time" id="eventTime" name="eventTime" v-model.lazy="event.time" required>
                </div> <br>
                <div> Location:
                <Select v-model="event.location" style="width:200px" id='SelectList' placeholder="Please Select your location" @on-change="fetchData">
                    <OptionGroup label="NUS Halls">
                        <Option v-for="item in nusHalls" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </OptionGroup>
                    <OptionGroup label="Residential Colleges">
                        <Option v-for="item in rcs" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </OptionGroup>
                    <OptionGroup label="Faculty">
                        <Option v-for="item in faculty" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </OptionGroup>
                </Select>
                <GmapMap id="GmapMap"
                    :center="{lat:event.lat, lng:event.long}"
                    :zoom="16"
                    map-type-id="terrain"
                    style="width: 300px; height: 200px; top: 10px; left:100px; border-radius:20px"
                    >
                    <GmapMarker ref="myMarker"
                        :position="google && new google.maps.LatLng(event.lat, event.long)" />
                </GmapMap> </div> <br>
                <div id="description">
                    <label for="eventDescription" id="descriptionLabel">Description:</label>
                    <textarea id="eventDate" name="eventDate" rows="5" cols="40" v-model.lazy="event.description" required></textarea>
                </div>
                <button style="position:relative; left:200px; top:30px" v-on:click="sendEvent">Submit</button>
            </div>
        </div>
    </div>
</template>


<script>
import database from '../firebase.js' 
import axios from 'axios'
import {gmapApi} from 'vue2-google-maps'
import firebase from "firebase";
import db from "@/firebase";

export default {
    data(){
        return {
            eventsList : [],
            event:{
                title:"",
                date:"",
                time:"",
                location:"",
                description:"",
                lat:1.296643,
                long:103.776394
            },
            nusHalls: [
                    {
                        value: 'Sheares hall',
                        label: 'Sheares hall'
                    },
                    {
                        value: 'Temasek hall',
                        label: 'Temasek hall'
                    },
                    {
                        value: 'King Edward VII hall',
                        label: 'King Edward VII hall'
                    },
                    {
                        value: 'Raffles hall',
                        label: 'Raffles hall'
                    },
                    {
                        value: 'Eusoff hall',
                        label: 'Eusoff hall'
                    },
                    {
                        value: 'Kent Ridge hall',
                        label: 'Kent Ridge hall'
                    },
                    {
                        value: 'PGP House',
                        label: 'PGP House'
                    }
                ],
            rcs: [
                    {
                        value: 'Tembusu College',
                        label: 'Tembusu College'
                    },
                    {
                        value: 'Cinnamon College',
                        label: 'Cinnamon College'
                    },
                    {
                        value: 'Residential College 4',
                        label: 'Residential College 4'
                    },
                    {
                        value: 'Ridge View Residential College',
                        label: 'Ridge View Residential College'
                    },
                    {
                        value: 'Prince Georges Park Residence',
                        label: 'Prince Georges Park Residence'
                    }
                ],
            faculty: [
                    {
                        value: 'NUS SoC',
                        label: 'NUS SoC'
                    },
                    {
                        value: 'NUS Faculty of Science',
                        label: 'NUS Faculty of Science'
                    },
                    {
                        value: 'NUS FASS',
                        label: 'NUS FASS'
                    },
                    {
                        value: 'NUS Business',
                        label: 'NUS Business'
                    },
                    {
                        value: 'NUS Engineering',
                        label: 'NUS Engineering'
                    },
                    {
                        value: 'NUS Medicine',
                        label: 'NUS Medicine'
                    }
                ],
        }
    },

    methods: {
        fetchItems: function() {
            database.collection('events').get().then(
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
        moreDetails: function(event) {
            var id = event.target.getAttribute("id");
            this.$router.push({path: '/eventDetails',name: 'eventDetails', params:{event_id : id}})
        },
        
        sendEvent: function() {
            if ((this.event.title !== '') && (this.event.date !== '') && (this.event.time !== '') && (this.event.description !== '')) {
                database.collection('events').add(this.event);
                alert(this.event.title + " updated! Looking forward to your event! :)");
                this.event.title="";
                this.event.date="";
                this.event.time="";
                this.event.location="";
                this.event.description="";
            } else {
                alert("Entry not filled!");
            }
        },
            fetchData:function(e) {
                const linkName = e.replace(/\s/g, '+');
                console.log(linkName);
                const link = "https://maps.googleapis.com/maps/api/geocode/json?address=" + linkName + "&key=AIzaSyD-enw5hB1RWEUF5cUDM908JknkpotEgVw";
                console.log(link);
                axios.get(link).then(response=>{
                    var dataArray = response.data; 
                    var dataList = dataArray["results"][0];
                    this.event.lat = dataList['geometry']['location']['lat'];
                    this.event.long = dataList['geometry']['location']['lng'];
                })
            }
    },
    created(){
      this.fetchItems();
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("State change user log")
                console.log(user)
                let docRef = db.collection('users').doc(user.uid)
                docRef.get().then(doc => {
                    this.userData = doc.data();
                    if(this.userData.imagePath) {
                        this.fetchUserImage()
                    }
                })
            } else {
                this.$router.push({path: "/settings/login"});
            }
        });
    },

  computed: {
      google: gmapApi
  }
}
</script>

<style scoped>
#title {
    position: relative;
    left: 50px;
    font-size: 40px;
}

.ol {
    max-width:60%;
    position: relative;
    left: 50px;
    height: 675px;
    background: white;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 70px;
    list-style-type: none;

}

.form{
  position: absolute;
  top: 5%;
  left: 60%;
}

ul {
display: flex;
flex-wrap: wrap;
width: 60%;
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

#eventName {
    position: relative;
    left: 10px;
    top: 10px;
    font-size: 22px;
    list-style-type: disc;
}

#details{
    position: relative;
    left: 65px;
    top: 15px;
    font-size: 16px;
}

.moreDetails{
    position: relative;
    left: 700px;
    top:-45px;
    font-Size: 20px;
}

#form {
    position: absolute;
    top: 5.5%;
    left: 65%;
    background: orange;
    border-style: dotted;
    border-color: black;
    border-width: 1px;
    border-radius: 70px;
    padding: 20px;
    width: 500px;
    height: 600px;
}

#description {
    
}

</style>