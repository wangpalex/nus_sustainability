<template>
    <div>
        <h1> {{this.event.title}} </h1> <br>
        <h2>Date: {{this.event.date}}  Time: {{this.event.time}} <br> </h2>
        <h3> Location: {{this.event.location}} <br> <br></h3>
        
        PLACEHOLDER FOR MAP <br> <br>

        <h2> Description: </h2><br>
        {{this.event.description}} <br><br>

        <button> Attend </button>
        <p v-on:click="backToEvents">Back to Events</p>

        </div>
</template>

<script>
import database from '../firebase.js'

export default {
    props: ['event_id'],
    data(){
        return{
            event : {}
        }
    },
    methods : {
        fetchItems: function(){
            database.collection('events').doc(this.event_id).get().then(snapshot =>{
                var temp = {}
                console.log(this.event_id)
                console.log(temp)
                temp = snapshot.data()
                console.log(temp)
                temp.id = snapshot.id
                this.event = temp
                console.log(temp)
            })
        }, 
        backToEvents: function() {
            this.$router.push({path: '/events', name: 'events'})
        }
    },
    created(){
        this.fetchItems()
    },
}
</script>

<style> 

</style>
