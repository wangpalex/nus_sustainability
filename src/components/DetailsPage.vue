<template>
   <div>
    <h1 id="head">Items for Exchange</h1>
        <div id="newItem">
            <div>
                <img v-bind:src=itemSelected.imageURL class="uploading-image" required/>
            </div>
            <div id="name">
                <p id="nameLabel"> Item name: </p>
                <p id="SelectedName"> {{itemSelected.name}} </p>
            </div>
            <div id="description">
                <p id="desLabel"> Item description: </p>
                <p id="SelectedDes"> {{itemSelected.description}} </p>
            </div>
        </div>
        <GmapMap id="GmapMap"
            :center="{lat:itemSelected.lat, lng:itemSelected.long}"
            :zoom="16"
            map-type-id="terrain"
            style="width: 350px; height: 250px; border-radius:15px"
            >
            <GmapMarker ref="myMarker"
                :position="google && new google.maps.LatLng(itemSelected.lat, itemSelected.long)" />
        </GmapMap>
    <button id="goBackButton" @click="$router.go(-1)">Go Back</button>
    <p id="deleteLine" v-show="owner">"As you are the owner of this item, you can delete the item here if you decide to delete it"</p>
    <button id="deleteButton" v-show="owner" @click="deleteItem">Delete Item</button>
   </div>
</template>

<script>
import db from '../firebase.js'
import firebase from "firebase";
import {gmapApi} from 'vue2-google-maps'

    export default {
        computed: {
            google: gmapApi,
        },
        props: ["detail_id"],
        data(){
            return{
               currentUserID: "",
               item:{
                    name:"",
                    description:"",
                    imageURL:"",
                    lat: "",
                    long: "",
                },
                itemSelected: {}
            }
        },
        methods:{
            owner() {
                this.currentUserID = firebase.auth().currentUser.uid;
                return (this.currentUserID == this.itemSelected.userID)
            },
            deleteItem:function() {
                db.collection("items").doc(this.detail_id).delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
                this.$Message.success(this.itemSelected.name + "is deleted!");
            },
            fetchItems:function(){
                db.collection('items').doc(this.detail_id).get().then(snapshot=>{
                    let item={}
                    item=snapshot.data()
                    item.id=snapshot.id
                    this.itemSelected = item 
                })    
            },
        },
        created(){
            this.fetchItems()    
        }
     }  // missing closure added
</script>



<style scoped>
img{
position: relative;
top: 70px;
left: 120px;
height: 200px; 
width: 200px;
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
    height: 580px;
    background: orange;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 70px;
}


#name {
    position: relative;
    top: -150px;
    left: 450px;
    width: 500px;
    height: 100px;
    background: orange;
    border-style: dotted;
    border-color: black;
    border-width: 1px;
    border-radius: 70px;
}

#description {
    position: relative;
    top: -120px;
    left: 450px;
    width: 500px;
    height: 300px;
    background: orange;
    border-style: dotted;
    border-color: black;
    border-width: 1px;
    border-radius: 70px;
}

#nameLabel {
    position: relative; 
    top: 10px; 
    left: 30px;
    font-size: 25px;
}

#SelectedName {
    position: relative; 
    top: -22px; 
    left: 180px;
    font-size: 25px;
}

#desLabel {
    position: relative; 
    top: 10px; 
    left: 30px;
    font-size: 25px;
}

#SelectedDes {
    position: relative; 
    top: 10px; 
    left: 30px;
    width: 450px;
    font-size: 25px;
    white-space: pre-line;
}

#goBackButton {
    position: relative;
    left:120px;
    top:-800px;
}

#GmapMap {
    position: relative;
    left: 150px;
    top:-300px;
}

#deleteLine {
    position: relative; 
    left: 550px;
    top: -350px;
    color: black;
}

#deleteButton {
    position: relative; 
    left: 750px;
    top: -350px;
}
 
 
 </style>