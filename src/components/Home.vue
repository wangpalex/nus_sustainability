<template>
    <div>
        <h1 class="title"> Hello, {{userData.name}} </h1>
        <div id="left-column">
            <!-- Website stats here -->
            <div id="stats1">
                <p style="font-size: 36px; margin-left: 10%; margin-top: 8%">
                    {{itemsExchanged}}
                </p>
                <p style="font-size: 20px; margin-left: 10%;">
                    Items Exchanged
                </p>
            </div>
            <div id="stats2">
                <p style="font-size: 36px; margin-left: 10%; margin-top: 8%">
                    {{eventsHosted}}
                </p>
                <p style="font-size: 20px; margin-left: 10%;">
                    Events Hosted
                </p>
            </div>

            <!-- Google Map here -->

        </div>

        <div id="right-column">
            <!-- Newly listed items -->


            <!-- Upcoming events -->

        </div>
    </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase";

export default {
    data() {
        return {
            userData:null,
            itemsExchanged: 0,
            eventsHosted: 0,
        }
    },

    methods: {
        fetchUserData() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    console.log("State change user log")
                    console.log(user)
                    let docRef = db.collection('users').doc(user.uid)
                    docRef.get().then(doc => {
                        this.userData = doc.data();
                    })
                } else {
                    this.$router.push({path: "/settings/login"});
                }
            });
        },

        fetchWebsiteStats() {
            let docRef = db.collection('stats').doc('1');
            docRef.get().then(doc => {
                let data = doc.data()
                this.itemsExchanged = data.itemsExchanged
                this.eventsHosted = data.eventsHosted
            })
        },
    },

    created() {
        this.fetchUserData();
        this.fetchWebsiteStats();
    },

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

#left-column  {
    position: relative;
    top:30px;
    float: left;
    width: 60%;
    height: 80%;


    border-color: aqua;
    border-style: dotted;
    border-width: 3px;

}

#right-column  {
    position: relative;
    top:30px;
    float: left;
    width: 30%;
    height: 80%;


    border-color: aquamarine;
    border-style: dotted;
    border-width: 3px;

}

#stats1 {
    float: left;
    position: relative;
    width: 25%;
    height: 15%;
    top:3%;
    left: 10%;

    color: #42427D;
    background-color: #FFBB80;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px 10px;
}

#stats2 {
    float: left;
    position: relative;
    width: 25%;
    height: 15%;
    top:3%;
    left: 30%;

    color: #42427D;
    background-color: #FFBB80;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px 50px;
}
</style>