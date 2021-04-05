<template>
    <div>
        <h1 id="head">Items for exchange {{itemsList.size()}}</h1>
        <Page :total="total" :current="page" @on-change="changePage" show-total></Page>
            <div id="itemsList">
                <button v-on:click="route()">Post a new item</button>
                <ol>
                    <li id="items" v-for="item in itemsList" v-bind:key="item.name">
                        <img id="itemImage" v-bind:src=item.imageURL>
                        <h2 id="itemName">{{item.name}}</h2>
                        <p class="detailPage" v-on:click="routeDetails($event)" v-bind:id=item.id>More Details ></p>
                        <vue-like-dislike-buttons id="likeButton"   :likes=item.likeCount
                                                                    :dislikes=item.dislikeCount
                                                                    :likeChecked="likeChecked"
                                                                    :dislikeChecked="dislikeChecked"
                                                                    @like="like(item.id)"
                                                                    @dislike="dislike(item.id)" />
                                                            
                    </li>
                </ol>
            </div>
            <div id="likedList">
                <br>
                <h2 style="position:relative;left:60px"> Your Liked Item </h2>
                <ol> 
                    <li id="likedItem" v-for="item in itemsLiked" v-bind:key="item.name">
                        <img id="likedItemImage" v-bind:src=item.imageURL>
                        <h2 id="likedItemName">{{item.name}}</h2>
                    </li>
                </ol>
            </div>
        <Page :total="total" :current="page" @on-change="changePage" show-total></Page>
   </div>
</template>

<script>
import database from '../firebase.js' 
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
        total: this.itemsList.size(),
        page: 1,
        list: this.getPageList(1, 3),
        }
  },
  methods:{
    getPageList(p, size) {
        return this.itemsList.slice((p - 1) * size, p * size)
    },
    changePage(p) {
        this.page = p
        this.list = this.getPageList(p, 3)
    }, 
    like(ID) {
        for (var i = 0; i < this.itemsList.length; i++){
            if(this.itemsList[i]["id"] == ID) {
                this.itemsList[i]["likeCount"] += 1;
                this.likeChecked = true; 
                this.itemsLiked.add(this.itemsList[i]);
                console.log(this.itemsLiked)
            }
        }
    },
    dislike(ID) {
        for (var i = 0; i < this.itemsList.length; i++){
            if(this.itemsList[i]["id"] == ID) {
                this.itemsList[i]["dislikeCount"] += 1;
                this.dislikeChecked = true; 
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
      database.collection('items').get().then((querySnapShot)=>{
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
#head {
    position: relative;
    left: 50px;
}

button {
  position: relative;
  left:500px;
  top: 50px;
  text-align: center;
  background-color: #FBBC46;
  color: white;
  height: 40px;
  width: 150px;
  border-radius: 60px;
  border-width: 1px;
  font-size: 15px;
}

#itemsList {
    position: relative;
    left: 50px;
    width: 720px;
    height: 580px;
    background: white;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 70px;
}

#items {
    position: relative;
    top: 60px;
    left: 15px;
    width: 620px;
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
    left: 30px;
    border-radius: 30px;
    width: 110px;
    height: 110px;

}

#itemName {
    position: relative;
    left: 180px;
    top: -50px;
    
}

.detailPage {
    position: relative;
    left: 480px;
    top: -80px;
    font-size: 18px; 
}

#likeButton {
    position: absolute;
    left: 500px;
    top: 105px;
    font-size: 20px; 
    color: grey;
}

#likedList {
    position: absolute;
    left: 800px;
    top: 80px;
    width: 320px;
    height: 580px;
    background: #FBBC46;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 70px;
}

#likedItem {
    position: relative;
    top: 60px;
    left: 15px;
    width: 220px;
    height: 100px;
    background: #FBBC46;
    border-style: dotted;
    border-color: black;
    border-width: 1px;
    border-radius: 60px;
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
    font-size: 15px;
}
 </style>