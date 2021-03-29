<template>
    <div>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>

        <body>

        <h1 class="title"> Profile Settings </h1>

        <div id="profile">
            <div class="column" id="left-column">
                <img id="user-image" src="../assets/logo.png" alt="User Image">
                <user-stats stats_name="Items Exchanged" stats_number=233></user-stats>
                <user-stats stats_name="Events Attended" stats_number=666></user-stats>
            </div>

            <div class="column" id="right-column">
                <info-bar title="Name" content="Wong Yong De Victor"></info-bar>
                <info-bar title="Course of Study" content="Business Analytics"></info-bar>
                <info-bar title="NUS Residence Affliation" content="Raffles Hall"></info-bar>
            </div>
        </div>
        </body>
    </div>
</template>

<script>
import UserStats from "@/components/Settings-components/UserStats.vue"
import InfoBar from "@/components/Settings-components/InfoBar";

export default {
    data() {
        return {

        }
    },

    components: {
        UserStats: UserStats,
        InfoBar: InfoBar,
    }

}
</script>

<style>

.title {
    position: absolute;

    left: 50px;
    top: 20px;

    font-family: Anaheim;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 58px;

    color: #42427D;
    background-color: aqua;
}

#profile {
    position: absolute;
    width: 92%;
    height: 600px;
    left: 50px;
    top: 120px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    background: #FFBB80;
    border-radius: 23px;
}

.column {
    display: grid;
    grid-template-columns: 1fr 3fr;
}

#left-column {
    /*
    background-color: burlywood;
    flex: 1;
    */
    float:
}

#right-column {
    /*
    background-color: chocolate;
    flex: 2.5;
    */
    float:70;
}


.nav {
    position: absolute;
    width: 320px;
    height: 463px;
    left: 64px;
    top: 301px;
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

img {
    width: 150px;
    height: 150px;

    display: block;
}

</style>