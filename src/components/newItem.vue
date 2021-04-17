<template>
    <div>
        <h1 class="title"> Post a new item </h1>

        <form id="form">
            <Button type="dashed" small id="goBackButton" @click="$router.go(-1)"> Go Back </Button><br>

            <div style="position: relative; top: -50px;">
                <label> Item Name </label><br>
                <Input for="itemName"
                       type="text"
                       v-model="item.name" placeholder="Please enter item name"
                       clearable style="width: 500px"></Input><br>

                <label> Item Description </label><br>
                <Input for="itemDescription"
                       v-model="item.description" placeholder="Please enter item description"
                       type="textarea"
                       :autosize="{minRows: 3,maxRows: 8}"></Input><br>

                <label> Location </label><br>
                <Select v-model="item.location" placeholder="Please select location" @on-change="fetchData">
                    <OptionGroup label="NUS Halls">
                        <Option v-for="item in nusHalls" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </OptionGroup>
                    <OptionGroup label="Residential Colleges">
                        <Option v-for="item in rcs" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </OptionGroup>
                    <OptionGroup label="Faculty">
                        <Option v-for="item in faculty" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </OptionGroup>
                </Select><br>

                <GmapMap id="GmapMap"
                         :center="{lat:item.lat, lng:item.long}"
                         :zoom="16"
                         map-type-id="terrain"
                >
                    <GmapMarker ref="myMarker"
                                :position="google && new google.maps.LatLng(item.lat, item.long)" />
                </GmapMap><br>

                <Button v-if="itemInfoReady" type="success"
                        long
                        @click="addItem"> Post new item </Button>
                <Button v-else type='error'
                        long
                        @click="promptFillIn"> Post new item </Button>
            </div>

        </form>

        <div id="chooseImage">
            <label> Item Image </label>
            <img v-bind:src=item.imageURL class="uploading-image" alt="Please upload image" required/>
            <input type="file" accept="image/jpeg" @change=uploadImage style="position:relative;left:70px;">
        </div>

    <!--div>
            <div id="chooseImage">
                <img v-bind:src=item.imageURL class="uploading-image" required/>
                <input type="file" accept="image/jpeg" @change=uploadImage>
            </--div>

            <div id="name">
                <label for="itemName" id="nameLabel">Item name:</label>
                <input type="text" id="itemName" name="itemName" size=30 v-model.lazy="item.name" required/>
            </div>
            <div id="description">
                <label for="itemDes" id="desLabel">Item description:</label>
                <textarea id="itemDescription" name="itemDes" cols="40" rows="5" v-model="item.description" required></textarea>
            </div>
            
        <Button v-if="eventInfoReady" class="submitButton" type="primary" 
                    @click="addItem"
                > Submit </Button>
        <Button v-else class="submitButton" type="primary"
                        @click="promptFillIn"
                > Submit </Button>
        <button id="goBackButton" @click="$router.go(-1)">Go Back</button>
    </div>

        <Select v-model="item.location" style="width:200px" id='SelectList' placeholder="Please Select your location" @on-change="fetchData">
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
            :center="{lat:item.lat, lng:item.long}"
            :zoom="16"
            map-type-id="terrain"
            style="width: 400px; height: 300px; border-radius:20px"
            >
            <GmapMarker ref="myMarker"
                :position="google && new google.maps.LatLng(item.lat, item.long)" />
        </GmapMap-->

   </div>
</template>

<script>
import database from '../firebase.js'
import axios from 'axios'
import firebase from "firebase";
import {gmapApi} from 'vue2-google-maps'

    export default {
        created(){
            this.updateUserID()    
        },

        data(){
            return{
               item:{
                    name:"",
                    description:"",
                    imageURL:"",
                    likeCount: 0,
                    dislikeCount: 0,
                    location:"",
                    lat: 1.296643,
                    long: 103.776394,
                    userID: ""
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
        methods:{
            updateUserID() {
                this.item.userID = firebase.auth().currentUser.uid
                console.log(this.item.userID)
            },

            promptFillIn() {
                this.$Message.error("Please fill in all the item information")
            },

            fetchData:function(e) {
                const linkName = e.replace(/\s/g, '+');
                const link = "https://maps.googleapis.com/maps/api/geocode/json?address=" + linkName + "&key=AIzaSyD-enw5hB1RWEUF5cUDM908JknkpotEgVw";
                axios.get(link).then(response=>{
                    var dataArray = response.data; 
                    var dataList = dataArray["results"][0];
                    this.item.lat = dataList['geometry']['location']['lat'];
                    this.item.long = dataList['geometry']['location']['lng'];
                })
            },

            captureLocation(value) {
                this.item.location = value;
            },

            uploadImage(e){
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.item.imageURL = e.target.result;
                };
            },

            addItem:function(){
                database.collection('items').add(this.item)
                this.$Message.success(this.item.name + " is posted")
                this.item.name="";
                this.item.description="";
                this.item.imageURL= "";
                this.item.likeCount=0;
                this.item.dislikeCount=0;
                this.item.location="";
                this.item.userID="";
                
                // Increase number of items exchanged for users
                database.collection('users').doc(firebase.auth().currentUser.uid).update({
                    itemsExchanged: firebase.firestore.FieldValue.increment(1)
                })

                 // Increase number of events hosted for the website
                database.collection('stats').doc('Apr').update({
                    itemsExchanged: firebase.firestore.FieldValue.increment(1)
                })

                this.$router.go(-1)
            },

            route() {
                this.$route.push({path:"/exchange"})
            },
        },

        computed: {
            google: gmapApi,

            itemInfoReady() {
                return ((this.item.name !== "") &&
                    (this.item.description !== "")&&
                    (this.item.imageURL !== "")&&
                    (this.item.location !== ""));
            },
        },
     }  // missing closure added
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

#goBackButton {
    position: relative;
    left:0px;
    top:-50px;
    width:80px;
}

label {
    font-family: Anaheim;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 58px;

    color: dimgrey;
}

img{
    position: relative;
    top: 20px;
    left: 10px;
    height: 270px;
    width: 270px;
    border-radius: 15px;
    border-style: dashed;
    border-width: 1px;
}

input {
    position: relative;
    top: 40px;
    left: 140px;
}

.uploading-image{
    display:flex;
}

#form {
    float: left;
    position: relative;
    margin-top: 30px;
    left: 50px;
    width: 500px;
    height: 600px;
    background: white;
    /*
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 30px;

     */
}

#chooseImage {
    float: left;
    position: relative;
    top: 30px;
    left: 8%;
    width: 30%;
    height: 340px;
    /*
    border-style: solid;
    border-color: black;
    border-width: 1px;

     */
}

#name {
    position: relative;
    top: -280px;
    left: 540px;
    width: 400px;
    height: 100px;
    background: orange;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 70px;
}

#description {
    position: relative;
    top: -250px;
    left: 540px;
    width: 400px;
    height: 200px;
    background: orange;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 70px;
}

#nameLabel {
    position: relative; 
    top: 40px; 
    left: 30px;
}

#desLabel {
    position: relative; 
    top: 40px; 
    left: 30px;
}

#itemName {
    position: relative;     
    top: 40px; 
    left: 40px;
}
textarea {
    position: relative; 
    top: 50px; 
    left: 30px;
}

.submitButton {
    position: relative;
    left:400px;
    top:180px;
    text-align: center;
    background-color: orange;
    color: white;
    height: 40px;
    width: 150px;
    border-radius: 60px;
    border-width: 1px;
    font-size: 15px;
    border-style: solid;
    border-color: black;
}

#SelectList {
    position: relative;
    left: 200px;
    top:-400px;
    font-size: 15px;
    height: 40px;
    width: 200px;
    text-align: center;
    line-height: 35px;
}

#GmapMap {
    position:relative;
    top:20px;
    left:0px;

    border-width: 1px;
    border-style: groove;

    width: 460px;
    height: 250px;
}

Button {
    position: relative;
    margin-top: 30px;
    width: 500px;
}

 </style>