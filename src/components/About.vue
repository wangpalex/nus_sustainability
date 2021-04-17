<template>
<div>
    <h1 class="title"> About Us </h1>

    <div id="backing">
        <h1 id="heading"> Our Motivation </h1>
        <p id="vision">
            Currently, there are many Environment Sustainability initiatives for NUS students. 
            In fact, many of the NUS residences even have their own environmental committees.
            However, because they are many and sparse, their effects are marginal. 
            Thus, our team decided to create a centralized platform to not only increase the exposure 
            and outreach of each of these environmental events, but to also facilitate the exchange, 
            or handing down of common room accessories in efforts to minimise the wastage 
            and encourage reusing items. 
        </p>
        <h1 id="statsHeading"> NUSustainable Statistics </h1>
        <NewUsersChart id="chart1"></NewUsersChart>
        <EventsExchangesGraph id="chart2"></EventsExchangesGraph>
        <!--TotalGraph></TotalGraph-->
    </div>
</div>
</template>

<script>
import NewUsersChart from "@/components/About-charts/NewUsersChart";
import EventsExchangesGraph from "@/components/About-charts/EventsExchangesGraph";
//import TotalGraph from "@/components/About-charts/TotalGraph";

export default {
    
    name: "About",
    data() {
        return {

        }
    },

    methods: {

    },

    components: {
        NewUsersChart: NewUsersChart,
        EventsExchangesGraph: EventsExchangesGraph,
        //TotalGraph: TotalGraph
    },

    computed: {

    },

    created: {

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

#backing {
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

#backing {
    position: relative;
    width: 92%;
    height: 650px;
    left: 50px;
    top: 20px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    background: #FFBB80;
    border-radius: 23px;
}

#heading {
    position: relative;
    left: 20px;
    top:20px;
}

#statsHeading {
    position: relative;
    left: 20px;
    top: -50px;
}

#vision {
    position: relative;
    font-size: 20px;
    left: 20px;
    top: -20px;
    width: 90%;
}

#chart1 {
    position: relative;
    height: 280px;
    left:-200px;
    top: 10px;
}

#chart2 {
    position: relative;
    height: 280px;
    left:-100px;
    top: 10px;
}

</style>