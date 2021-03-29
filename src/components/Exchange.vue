<template>
    <div>
        <h1 id="head">Items for exchange</h1>
        <div id="itemsList">
            <button v-on:click="route()">Post a new item</button>
            <ol>
                <li id="items" v-for="item in itemsList" v-bind:key="item.name">
                    <img id="itemImage" v-bind:src=item.imageURL>
                    <h2 id="itemName">{{item.name}}</h2>
                    <p class="detailPage" v-on:click="routeDetails($event)" v-bind:id=item.id>More Details ></p>
                </li>
            </ol>
        </div>
   </div>
</template>

<script>
import database from '../firebase.js' 
export default {
  
  data(){
    return{
        itemsList: []
        }
  },
  methods:{
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


<style>
#head {
    position: relative;
    left: 50px;
}

button {
  position: relative;
  left:500px;
  top: 50px;
  text-align: center;
  background-color: orange;
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
    background: orange;
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
    left: 170px;
    top: -100px;
    
}

.detailPage {
    position: relative;
    left: 480px;
    top: -120px;
    font-size: 20px; 
}


 </style>