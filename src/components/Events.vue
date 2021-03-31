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
            <div class ="form">
                <h2> Submit your own event </h2>
                Event name <br>
                <input> <br> <br>
                Date <br>
                <input> <br> <br>
                Time <br>
                <input> <br> <br>
                Location <br>
                <input> <br> <br>
                Description <br>
                <input> <br> <br>
                </div>
        </div>
    </div>
</template>


<script>
import database from '../firebase.js' 

export default {
    data(){
        return {
            eventsList : []
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
</style>