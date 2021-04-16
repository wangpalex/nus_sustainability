<template>
   <div>
    <h1 class="title">Items For Exchange</h1>

        <div id="newItem">
            <div class="leftColumn">
                <Button type="dashed" id="goBackButton" @click="$router.go(-1)"> Go Back</Button>
                <div>
                    <img v-bind:src=itemSelected.imageURL class="uploading-image" required/>
                </div>
                <GmapMap id="GmapMap"
                         :center="{lat:itemSelected.lat, lng:itemSelected.long}"
                         :zoom="16"
                         map-type-id="terrain"
                >
                    <GmapMarker ref="myMarker"
                                :position="google && new google.maps.LatLng(itemSelected.lat, itemSelected.long)" />
                </GmapMap>
            </div>

            <div class="rightColumn">
                <div id="name">
                    <p id="SelectedName"> {{itemSelected.name}} </p>
                </div>
                <div id="description">
                    <p id="SelectedDes"> {{itemSelected.description}} </p>
                </div>
                <button id="deleteButton" v-show="owner" @click="deleteItem">Delete Item</button>       
            </div>
        </div>

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

.leftColumn {
    float:left;
    position: relative;
    width: 50%;
    height: 100%;
}
.rightColumn {
    float:left;
    position: relative;
    width: 50%;
    height: 100%;
}

img{
    position: relative;
    top: 0px;
    left: 120px;
    height: 250px;
    width: 250px;
    border-radius: 20px;
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
    margin-top: 30px;
    left: 50px;
    width: 1000px;
    height: 56%;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 15px;
}

#name {
    position: relative;
    margin-top: 30px;
    margin-left: 5px;
    width: 95%;
    height: 10%;
    /*
    border-style: dotted;
    border-color: black;
    border-width: 1px;
    border-radius: 15px;
     */

}

#SelectedName {
    position: relative;
    top: 0px;
    left: 150px;
    font-size: 36px;
}
#description {
    position: relative;
    margin-top: 10px;
    margin-left: 5px;
    width: 95%;
    height: 70%;
    border-style: dotted;
    border-color: black;
    border-width: 1px;
    border-radius: 15px;
    background: #FFBB80;
}

#SelectedDes {
    position: relative;
    top: 10px;
    left: 20px;
    width: 90%;
    font-size: 18px;
    white-space: pre-line;
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
    font-size: 12px;
}
#goBackButton {
    position: relative;
    left:10px;
    top:10px;
}
#GmapMap {
    position: relative;
    width: 420px;
    height:250px;
    left: 8%;
    top:3%;
    border-width: 1px;
    border-style: groove;
}


#deleteButton {
    position: relative;
    width:30%;
    margin-top: 5%;
    margin-left: 30%;
}
 
 
 </style>