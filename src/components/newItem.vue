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
            <button v-on:click.prevent="addItem">Add Item</button>
        </div>
   </div>
</template>

<script>
import database from '../firebase.js'

    export default {
        name:'imageUpload',
        data(){
            return{
               item:{
                    name:"",
                    description:"",
                    imageURL:""
                }
            }
        },
        methods:{
            uploadImage(e){
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.item.imageURL = e.target.result;
                    console.log(this.item.imageURL);
                };
            },
            addItem:function(){
                database.collection('items').add(this.item)
                alert(this.item.name + " saved to database");
                this.item.name="";
                this.item.description="";
                this.item.imageURL= "";
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
    height: 580px;
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
    border-style: dotted;
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
    border-style: dotted;
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
    border-style: dotted;
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

button {
  position: relative;
  left:400px;
  top:-180px;
  text-align: center;
  background-color: orange;
  color: white;
  height: 40px;
  width: 150px;
  border-radius: 60px;
  border-width: 1px;
  font-size: 15px;
}

 </style>