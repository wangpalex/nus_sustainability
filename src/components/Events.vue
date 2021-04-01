<template>
    <div>
        <h1>Events Bulletin</h1>
        <div>
            <ol class = "ol">
                <li v-for ="i in eventsList" :key="i.id">
                    <ul><li>{{i.title}}</li></ul>
                    Location: {{i.location}} <br>
                    Date: {{i.date}} <br>
                    Time: {{i.time}} <br>
                    {{i}}
                    <p v-on:click="moreDetails($event)" v-bind:id=i.id>More Details ></p>
                </li>
                    
            </ol>



            <div id="form">
                <h2 id="head"> Submit your own event </h2>
                <div id="newEvent">
                    <div id="name">
                        <label for="eventName" id="nameLabel">Event Name:</label>
                        <input type="text" id="eventName" name="eventName" v-model.lazy="event.title" required>
                    </div>
                    <div id="date">
                        <label for="eventDate" id="dateLabel">Date:</label>
                        <input type="date" id="eventDate" name="eventDate" v-model.lazy="event.date" required>
                    </div>
                    <div id="time">
                        <label for="eventTime" id="timeLabel">Time:</label>
                        <input type="time" id="eventTime" name="eventTime" v-model.lazy="event.time" required>
                    </div>
                    <div id="location">
                        <label for="eventLocation" id="locationLabel">Location:</label>
                        <input type="text" id="eventLocation" name="eventLocation" v-model.lazy="event.location" required>
                    </div>
                    <div id="description">
                        <label for="eventDescription" id="descriptionLabel">Description:</label>
                        <textarea id="eventDate" name="eventDate" rows="5" cols="40" v-model.lazy="event.description" required></textarea>
                    </div>
                    <button v-on:click="sendEvent">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import database from '../firebase.js' 

export default {
    data(){
        return {
            eventsList : [],
            event:{
                title:"",
                date:"",
                time:"",
                location:"",
                description:"",
            }
        }
    },

    methods: {
        fetchItems: function() {
            database.collection('events').get().then(
                (querySnapshot) => { 
                    var temp = {}
                    querySnapshot.forEach( x=> {
                        temp = x.data()
                        temp.id = x.id
                        this.eventsList.push(temp)
                        }
                    )
                }
            )
        },
        moreDetails: function(event) {
            var id = event.target.getAttribute("id");
            this.$router.push({path: '/eventDetails',name: 'eventDetails', params:{event_id : id}})
        },
        
        sendEvent: function() {
            if ((this.event.title !== '') && (this.event.date !== '') && (this.event.time !== '') && (this.event.description !== '')) {
                database.collection('events').add(this.event);
                alert(this.event.title + " updated! Looking forward to your event! :)");
                this.event.title="";
                this.event.date="";
                this.event.time="";
                this.event.location="";
                this.event.description="";
            } else {
                alert("Entry not filled!");
            }
        }
    },
    created(){
      this.fetchItems()    
  }
}
</script>

<style>
.ol {
    max-width:60%
}

.form{
  position: absolute;
  top: 5%;
  left: 60%;
}

ul {
display: flex;
flex-wrap: wrap;
list-style-type: none;
padding: 0;
width: 70%
}

li {
flex-grow: 1;
flex-basis: 300px;
text-align: center;
padding: 10px;
border: 1px solid #222;
margin: 10px;
}


#form {
    position: absolute;
    top: 5%;
    left: 65%;
    background: orange;
    border-style: dotted;
    border-color: black;
    border-width: 1px;
    border-radius: 70px;
    padding: 20px;
}
</style>