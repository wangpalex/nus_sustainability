<template>
    <div>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>

        <body>

        <h1 class="title"> Profile Settings </h1>

        <div id="profile">

            <div id="left-column">

                <img id="user-image" src="../assets/logo.png" alt="User Image">
                <user-stats stats_name="Items Exchanged" stats_number=233></user-stats>
                <user-stats stats_name="Events Attended" stats_number=666></user-stats>

            </div>

            <div id="right-column">

                <info-bar title="Name" content="Wong Yong De Victor"></info-bar>
                <info-bar title="Course of Study" content="Business Analytics"></info-bar>
                <info-bar title="NUS Residence Affliation" content="Raffles Hall"></info-bar>
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
//import db from "firebase";

export default {
    data() {
        return {

        }
    },

    methods: {

    },

    components: {
        UserStats: UserStats,
        InfoBar: InfoBar,
        LineChart: LineChart,
    }

}
</script>

<style>

.title {
    position: relative;

    left: 50px;
    top: 20px;

    font-family: Anaheim;
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
    float: left;
    width: 30%;
    border-color: aqua;
    border-style: dotted;
    border-width: 3px;
}

#right-column  {
    float: left;
    width: 69%;
    border-color: aquamarine;
    border-style: dotted;
    border-width: 3px;
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

img {
    top:50pxå;
    width: 150px;
    height: 150px;
    margin-left: auto;
    margin-right: auto;
    display: block;
}

</style>