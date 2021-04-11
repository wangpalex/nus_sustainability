<template>
   <div>
    <h1 id="head">Items for exchange</h1>
        
        <div id="newItem">
            <div id="chooseImage">
                <img v-bind:src=item.imageURL class="uploading-image" required/>
                <input type="file" accept="image/jpeg" @change=uploadImage>
            </div>
            <div id="name">
                <label for="itemName" id="nameLabel">Item name:</label>
                <input type="text" id="itemName" name="itemName" size=30 v-model.lazy="item.name" required/>
            </div>
            <div id="description">
                <label for="itemDes" id="desLabel">Item description:</label>
                <textarea id="itemDescription" name="itemDes" cols="40" rows="5" v-model="item.description" required></textarea>
            </div>
            
        <button id="addItem" v-on:click.prevent="addItem">Add Item</button>
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
        </GmapMap>
   </div>
</template>

<script>
import database from '../firebase.js'
import axios from 'axios'
import {gmapApi} from 'vue2-google-maps'

    export default {
        computed: {
            google: gmapApi
        },
        name:'imageUpload',
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
            fetchData:function(e) {
                const linkName = e.replace(/\s/g, '+');
                console.log(linkName);
                const link = "https://maps.googleapis.com/maps/api/geocode/json?address=" + linkName + "&key=AIzaSyD-enw5hB1RWEUF5cUDM908JknkpotEgVw";
                console.log(link);
                axios.get(link).then(response=>{
                    console.log(response.data);
                    var dataArray = response.data; 
                    var dataList = dataArray["results"][0];
                    this.item.lat = dataList['geometry']['location']['lat'];
                    this.item.long = dataList['geometry']['location']['lng'];
                    console.log(this.item.lat);
                    console.log(this.item.long);
                })
            },
            captureLocation(value) {
                this.item.location = value;
                console.log(1);
                console.log(value);
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
                alert(this.item.name + " saved to database");
                this.item.name="";
                this.item.description="";
                this.item.imageURL= "";
                this.item.likeCount=0;
                this.item.dislikeCount=0;
                this.item.location="";
            }
        }
     }  // missing closure added
</script>



<style scoped>
img{
position: relative;
top: 20px;
left: 60px;
height: 260px; 
width: 280px;
border-radius: 40px;
}

input {
position: relative;
top: 40px;
left: 140px;
}

.uploading-image{
    display:flex;
}

#newItem {
    position: relative;
    left: 80px;
    width: 1000px;
    height: 880px;
    background: orange;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 70px;
}

#chooseImage {
    position: relative;
    top: 60px;
    left: 80px;
    width: 400px;
    height: 340px;
    background: orange;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 70px;
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

#addItem {
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

#goBackButton {
    position: relative;
    left:-100px;
    top:-630px;
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
    position: relative;
    left: 500px;
    top:-450px;
}
 </style>