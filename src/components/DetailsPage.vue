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
                <h1 id="name">
                     {{itemSelected.name}}
                </h1>
                <div id="description">
                    <p id="SelectedDes"> {{itemSelected.description}} </p>
                </div>
                <Button type="error" class="deleteButton" v-if="owner" @click="deleteItem">Delete Item</Button>
                <Button type="error" class="deleteButton" v-else disabled>Delete Item</Button>
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

            owner() {
                if(firebase.auth().currentUser) {
                    return (firebase.auth().currentUser.uid == this.itemSelected.userID)
                } else {
                    return false
                }
            },
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
            deleteItem:function() {
                db.collection("items").doc(this.detail_id).delete().then(() => {
                    //console.log("Document successfully deleted!");
                }).catch((error) => {
                    this.$Message.error("Error removing document: " + error.message)
                    //console.error("Error removing document: ", error);
                });
                this.$Message.success(this.itemSelected.name + "is deleted!");
                this.$router.go(-1)
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

#newItem {
    position: relative;
    margin-top: 30px;
    left: 50px;
    width: 1100px;
    height: 577px;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 15px;
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

#name {
    position: relative;
    top: 30px;
    left: 120px;
    margin: auto;
    width: 95%;
    height: 10%;
}

#description {
    position: relative;
    margin-top: 30px;
    margin-left: 5px;
    width: 95%;
    height: 75%;

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

#goBackButton {
    position: relative;
    left:10px;
    top:10px;
}
#GmapMap {
    position: relative;
    width: 420px;
    height:250px;
    top:3%;
    border-width: 1px;
    border-style: groove;
}


.deleteButton {
    position: relative;
    width:50%;
    margin-top: 2%;
    margin-left: 24%;
}
 
 
 </style>