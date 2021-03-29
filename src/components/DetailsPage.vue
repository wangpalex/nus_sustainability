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
   </div>
</template>

<script>
import database from '../firebase.js'

    export default {
        props: ["detail_id"],
        data(){
            return{
               item:{
                    name:"",
                    description:"",
                    imageURL:""
                },
                itemSelected: {}
            }
        },
        methods:{
            fetchItems:function(){
        database.collection('items').doc(this.detail_id).get().then(snapshot=>{
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
height: 300px; 
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
    height: 580px;
    background: orange;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 70px;
}


#name {
    position: relative;
    top: -260px;
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
    top: -240px;
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
    top: -42px; 
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

 </style>