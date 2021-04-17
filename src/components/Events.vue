<template>
    <div>
        <h1 class="title">Events Bulletin</h1>

        <div id = "main">
            <div v-for ="i in eventsList" :key="i.id" id="events">
                <div id = "eventName"><p>{{i.title}}</p></div>
                <div id ="details">
                    Location: {{i.location}} <br>
                    Date: {{formatDate(i.date)}} <br>
                    Time: {{i.time}} <br>
                </div>
                <p v-on:click="moreDetails($event)" v-bind:id=i.id class = "moreDetails">
                    More Details >
                </p>
            </div>
        </div>

        <div id="form">
            <h2 id="head"> Submit your own event </h2>
            <Form :model="event" :label-width="80">
                <FormItem label="Event Name">
                    <Input v-model.lazy="event.title" placeholder="Enter event name"></Input>
                </FormItem>

                <FormItem label="Date & Time">
                    <Row>
                        <Col span="11">
                            <DatePicker type="date" format="yyyy-MM-dd" placeholder="Select date" v-model.lazy="event.date"></DatePicker>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <TimePicker type="time" format="HH:mm" placeholder="Select time" v-model.lazy="event.time"></TimePicker>
                        </Col>
                    </Row>
                </FormItem>

                <FormItem label="Description">
                    <Input v-model="event.description" type="textarea" rows="3" placeholder="Enter something..."></Input> 
                </FormItem>

                <FormItem label="Location">
                    <Select v-model="event.location" style="" id='SelectList' placeholder="Select event location" @on-change="fetchData">
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
                </FormItem>


                <GmapMap id="GmapMap"
                         :center="{lat:event.lat, lng:event.long}"
                         :zoom="16"
                         map-type-id="terrain">
                    <GmapMarker ref="myMarker"
                                :position="google && new google.maps.LatLng(event.lat, event.long)" />
                </GmapMap>



                <Button v-if="eventInfoReady" class="submitButton"
                    type="primary" long
                    @click="sendEvent"
                > Submit </Button>
                <Button v-else class="submitButton"
                        type="error" long
                        @click="promptFillIn"
                > Submit </Button>

            </Form>
        </div>

        <!--div id="form">
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
        </div-->

    </div>
</template>


<script>
import database from '../firebase.js' 
import axios from 'axios'
import moment from 'moment'
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
                long:103.776394,
                userID:"",
                /*
                userData: {},
                webData: {}
                 */
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
        updateUserID() {
                this.event.userID = firebase.auth().currentUser.uid
                console.log(this.event.userID)
        },
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
            this.event.userID = firebase.auth().currentUser.uid
            console.log(this.event)
            database.collection('events').add(this.event);
            this.$Message.success(this.event.title + " updated! Looking forward to your event! :)");
            this.event.title="";
            this.event.date="";
            this.event.time="";
            this.event.location="";
            this.event.description="";
            this.event.userID="";

            // Increase number of events hosted for the user
            database.collection('users').doc(firebase.auth().currentUser.uid).update({
                eventsAttended: firebase.firestore.FieldValue.increment(1)
            })

            // Increase number of events hosted for the website
            database.collection('stats').doc('Apr').update({
                eventsHosted: firebase.firestore.FieldValue.increment(1)
            })

            location.reload()
        },

        formatDate(value) {
            return moment.unix(value.seconds).format("MM/DD/YYYY")
        },

        promptFillIn() {
            this.$Message.error("Please fill in event information")
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
        this.updateUserID();
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

  computed: {
      google: gmapApi,

      eventInfoReady() {
          return ((this.event.title !== '') &&
              (this.event.date !== '') &&
              (this.event.time !== '') &&
              (this.event.description !== '') &&
              (this.event.location !== ''))
      },

  }
}
</script>

<style scoped lang="css">

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

#main {
    float: left;
    position: relative;
    margin-top: 30px;
    left: 50px;
    width: 640px;
    height: 575px;
    background: white;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 20px;
    overflow-y: scroll;
    overflow-x: hidden;
}
#main::-webkit-scrollbar {
    background: transparent;
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

ul {
    display: flex;
    flex-wrap: wrap;
    width: 60%;
}

#events {
    position: relative;
    margin-top: 3%;
    margin-left: 5%;
    width: 86%;
    height: 20%;

    background: #FFBB80;
    border-style: dotted;
    border-color: black;
    border-width: 0px;
    border-radius: 15px;
}

#eventName {
    position: relative;
    left: 20px;
    top: 5px;
    font-size: 20px;
    list-style-type: disc;
}

#details{
    position: relative;
    left: 40px;
    top: 5px;
    font-size: 16px;
}

.moreDetails{
    position: relative;
    left: 70%;
    top:-50%;
    font-Size: 20px;
}
.moreDetails:hover {
    cursor: pointer;
}

#form {
    float: left;
    position: absolute;
    margin-left: 62%;
    margin-top: 30px;
    width: 355px;
    height: 577px;
    /*
    top: 5.5%;
    left: 65%;
     */
    background: white;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 15px;
    padding: 20px;
}


#GmapMap {
    position:relative;
    top:10px;
    left:4px;

    border-width: 1px;
    border-style: groove;

    width: 305px;
    height: 200px;
}

.submitButton {
    position: relative;
    margin-top: 20px;
    margin-left: 8px;
    width: 305px;
}


</style>