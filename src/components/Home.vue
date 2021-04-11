<template>
    <div>
        <h1 class="title"> Hello, {{userData.name}} </h1>
        <div id="left-column">
            <!-- Website stats here -->



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
        }
    },

    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("State change user log")
                console.log(user)
                let docRef = db.collection('users').doc(user.uid)
                docRef.get().then(doc => {
                    this.userData = doc.data();
                    if (this.userData.imagePath) {
                        this.fetchUserImage()
                    }
                })
            } else {
                this.$router.push({path: "/settings/login"});
            }
        });
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
</style>