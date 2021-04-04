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
        <Dropdown id="Dropdown" @on-click="captureLocation">
            <a href="javascript:void(0)" style="color:white"> 
                Your location
                <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list" id="DropdownMenu">
                <Dropdown placement="right-start" @on-click="captureLocation">
                    <DropdownItem>
                        NUS Halls
                        <Icon type="ios-arrow-forward"></Icon>
                    </DropdownItem>
                    <DropdownMenu slot="list" id="hallMenu">
                        <DropdownItem>Sheares hall</DropdownItem>
                        <DropdownItem>Temasek hall</DropdownItem>
                        <DropdownItem>King Edward VII hall</DropdownItem>
                        <DropdownItem>Raffles hall</DropdownItem>
                        <DropdownItem>Eusoff hall</DropdownItem>)
                        <DropdownItem>Kent Ridge hall</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                
                <Dropdown placement="right-start">
                    <DropdownItem>
                        Utown
                        <Icon type="ios-arrow-forward"></Icon>
                    </DropdownItem>
                    <DropdownMenu slot="list" id="utMenu">
                        <DropdownItem>Tembusu College</DropdownItem>
                        <DropdownItem>Cinnamon College</DropdownItem>
                        <DropdownItem>Residential College 4</DropdownItem>
                        <DropdownItem>NUS ERC</DropdownItem>
                        <DropdownItem>Stephen Riady Center</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <Dropdown placement="right-start">
                    <DropdownItem>
                        Faculty
                        <Icon type="ios-arrow-forward"></Icon>
                    </DropdownItem>
                    <DropdownMenu slot="list" id="facultyMenu">
                        <DropdownItem>NUS SoC</DropdownItem>
                        <DropdownItem>NUS Faculty of Science</DropdownItem>
                        <DropdownItem>NUS FASS</DropdownItem>
                        <DropdownItem>NUS Business</DropdownItem>
                        <DropdownItem>NUS Engineering</DropdownItem>
                        <DropdownItem>NUS Medicine</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <DropdownItem>PGPR and PGP house</DropdownItem>
                <DropdownItem>Ridge View Residential College</DropdownItem>
                <DropdownItem>Yale-NUS</DropdownItem>
            </DropdownMenu>
        </Dropdown>
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
                    imageURL:"",
                    likeCount: 0,
                    dislikeCount: 0,
                    location:"",
                },
            }
        },
        methods:{
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

button {
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

#Dropdown {
    position: relative;
    left: 400px;
    top:-400px;
    border-radius: 90px;
    border-width: 1px;
    border-style: solid;
    border-color: black;
    background-color:orange;
    font-size: 15px;
    height: 40px;
    width: 200px;
    text-align: center;
    line-height: 35px;
}

#DropdownMenu {
    background-color:orange;
    text-align: center;
    height: 180px;
    width: 200px;
}
#hallMenu {
    background-color:orange;
    text-align: center;
    height: 240px;
    width: 200px;  
}

#utMenu {
    background-color:orange;
    text-align: center;
    height: 160px;
    width: 200px;
}

#facultyMenu {
    background-color:orange;
    text-align: center;
    height: 180px;
    width: 200px;
}
 </style>