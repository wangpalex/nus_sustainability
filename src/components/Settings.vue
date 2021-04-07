<template>
    <div>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>

        <body>

        <h1 class="title"> Profile Settings </h1>

        <div id="profile">
            <div id="left-column">
                <img v-if="userData.imagePath" id="user-image" class="user-image" src="" alt="User Image">
                <img v-else class="user-image" src="../assets/logo.png" alt="User Image">

                <user-stats stats_name="Items Exchanged" :stats_number="userData.itemsExchanged"></user-stats>
                <user-stats stats_name="Events Attended" :stats_number="userData.eventsAttended"></user-stats>

                <Button type="primary" @click="routeLogin()"> Sign in </Button>
                <br><br>
                <Button type="error" @click="signOut"> Sign out </Button>
            </div>

            <div id="right-column">
                <info-bar title="Name" :content="userData.name"></info-bar>
                <info-bar title="Course of Study" :content="userData.course"></info-bar>
                <info-bar title="NUS Residence Affliation" :content="userData.residence"></info-bar>
                <LineChart></LineChart>
            </div>

        </div>
        </body>
    </div>
</template>

<script>
import UserStats from "@/components/Settings-components/UserStats.vue";
import InfoBar from "@/components/Settings-components/InfoBar";
import LineChart from "@/components/Settings-charts/LineChart";
import firebase from "firebase";
import db from "../firebase";

export default {
    data() {
        return {
            userData:{},
        }
    },

    methods: {
        routeLogin() {
          this.$router.push({path:"settings/login"});
        },

        signOut() {
            if(firebase.auth().currentUser) {
                firebase.auth().signOut().then(() => {
                    this.$Message.success("Signed out")
                    this.$router.push({path:"settings/login"})
                }).catch((error) => {
                    this.$Message.error(error.message)
                });
            } else {
                this.$Message.error("Not signed in")
            }

        },

        fetchUserImage() {
            const imgRef = firebase.storage().ref(this.userData.imagePath);  // get the image by ref string
            imgRef.getDownloadURL().then(url => {
                var img = document.getElementById('user-image');
                img.setAttribute('src', url);
            })
        },
    },

    components: {
        UserStats: UserStats,
        InfoBar: InfoBar,
        LineChart: LineChart,
    },

    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("State change user log")
                console.log(user)
                let docRef = db.collection('users').doc(user.uid)
                docRef.get().then(doc => {
                    this.userData = doc.data();
                    if(this.userData.imagePath) {
                        this.fetchUserImage()
                    }
                })
            } else {
                this.$router.push({path: "/settings/login"});
            }
        });

        /*
        if(!firebase.auth().currentUser) {
            this.$Message.error("Please sign in");
            this.$router.push({path: "/settings/login"})
        } else {
            let docRef = db.collection('users').doc(firebase.auth().currentUser.uid)
            docRef.get().then(doc => {
                this.userData = doc.data();
                if(this.userData.imagePath) {
                    this.fetchUserImage()
                }
            })
        }

         */
    },

}
</script>

<style>

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

#profile {
    position: relative;
    width: 92%;
    height: 850px;
    left: 50px;
    top: 20px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    background: #FFBB80;
    border-radius: 23px;
}

#left-column  {
    position: relative;
    top:30px;
    float: left;
    width: 30%;
    height: 80%;

    /*
    border-color: aqua;
    border-style: dotted;
    border-width: 3px;
    */
}

#left-column button {
    position: relative;
    left: 140px;
}

#right-column  {
    position: relative;
    top:30px;
    float: left;
    width: 50%;
    height: 90%;

    /*
    border-color: aquamarine;
    border-style: dotted;
    border-width: 3px;
    */
}

.nav {

  position: absolute;
  width: 320px;
  height: 463px;
  left: 64px;
  top: 350px;

}

.section {
    position: absolute;
    width: 1528px;
    height: 1031px;
    left: 368px;
    top: 25px;

    /* white */

    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 60px;
}

.user-image {
    top:50px;
    width: 150px;
    height: 150px;
    margin-left: auto;
    margin-right: auto;
    display: block;
}

</style>