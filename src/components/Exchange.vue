<template>
    <div>
        <h1 class="title">Items for exchange</h1>
        <div id="itemsList">
            <Button type="primary" v-on:click="route()">Post a new item</Button>

            <div id="items" v-for="item in itemsList" v-bind:key="item.name">
                <img class="itemImage" v-bind:src=item.imageURL>
                <div class="itemName">{{item.name}}</div>
                <p class="detailPage" v-on:click="routeDetails($event)" v-bind:id=item.id>More Details ></p>
                <vue-like-dislike-buttons id="likeButton"   :likes=item.likeCount
                                                            :dislikes=item.dislikeCount
                                                            :likeChecked="likeChecked"
                                                            :dislikeChecked="dislikeChecked"
                                                            @like="like(item.id)"
                                                            @dislike="dislike(item.id)" />

            </div>

        </div>
        <div id="likedList">
            <br>
            <h2 style="position:relative;left:20px"> Your Liked Items </h2>

                <div id="likedItem" v-for="item in itemsLiked" v-bind:key="item.name">
                    <img id="likedItemImage" v-bind:src=item.imageURL>
                    <h2 id="likedItemName">{{item.name}}</h2>
                </div>

        </div>
   </div>
</template>

<script>
import db from '../firebase.js' 
import VueLikeDislikeButtons from 'vue-like-dislike-buttons'


export default {
  components: {
    VueLikeDislikeButtons
  },
  
  data(){
    return{
        itemsList: [],
        likeChecked: false,
        dislikeChecked: false,
        itemsLiked: new Set(),
        }
  },
  methods:{

    like(ID) {
        for (var i = 0; i < this.itemsList.length; i++){
            if(this.itemsList[i]["id"] == ID) {
                this.itemsList[i]["likeCount"] += 1;
                this.likeChecked = true; 
                this.itemsLiked.add(this.itemsList[i]);
                console.log(this.itemsLiked)
                db.collection("items").doc(ID).update({
                    likeCount: this.itemsList[i]["likeCount"]
                })
            }
        }
    },
    dislike(ID) {
        for (var i = 0; i < this.itemsList.length; i++){
            if(this.itemsList[i]["id"] == ID) {
                this.itemsList[i]["dislikeCount"] += 1;
                this.dislikeChecked = true; 
                console.log(this.itemsList[i]["dislikeCount"])
                db.collection("items").doc(ID).update({
                    dislikeCount: this.itemsList[i]["dislikeCount"]
                })
            }
        }
    },
    route: function() {
            this.$router.push({ path: "/newItem", name: "newItem"})
    },
    routeDetails: function(event) {
            let new_id = event.target.getAttribute("id");
            this.$router.push({path: '/detailsPage', name: 'detailsPage', params: {detail_id: new_id}})
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
         
  },
  created(){
      this.fetchItems()    
  }
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

/*
button {
  position: relative;
  left:450px;
  margin-top: 20px;
  text-align: center;
  height: 5%;
  width: 150px;
  border-radius: 5px;
  font-size: 15px;
    border-width: 0px;
    font-weight: bold;
}
*/
button {
    position: relative;
    left:450px;
    margin-top: 20px;
    text-align: center;
    width: 150px;
    font-size: 15px;
}

#itemsList {
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
    overflow: scroll;
}

#items {
    position: relative;
    margin-top: 2%;
    left: 15px;
    width: 600px;
    height: 20%;
    background: #FFBB80;
    border-style: dotted;
    border-color: black;
    border-width: 0px;
    border-radius: 25px;
}

.itemImage {
    float: left;
    position: relative;
    margin-top:1.5%;
    margin-left: 2%;
    border-radius: 20px;
    width: 17%;
    height: 86%;

}

.itemName {
    float: left;
    position: relative;
    margin-top: 6%;
    margin-left: 6%;
    font-size: 30px;
    
}

.detailPage {
    float:left;
    position: relative;
    margin-left: 50%;
    margin-top:-7%;
    font-size: 20px;
}

#likeButton {
    float: left;
    position: relative;
    left: 66%;
    top: 0%;
    font-size: 20px;
    color: grey;
}

#likedList {
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
    overflow: scroll;
}

#likedItem {
    position: relative;
    margin-top: 3%;
    margin-left: 6%;
    width: 86%;
    /*
    top: 60px;
    left: 15px;
    width: 220px;
    height: 100px;
    */
    background: #FFBB80;
    border-style: dotted;
    border-color: black;
    border-width: 0px;
    border-radius: 15px;
}

#likedItemImage {
    position: relative;
    top: 10px;
    left: 20px;
    border-radius: 20px;
    width: 70px;
    height: 70px;
}

#likedItemName {
    position: relative;
    left: 100px;
    top: -40px;
    font-size: 20px;
}
 </style>