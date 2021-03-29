<template>
    <div>
        <p>{{title}}</p>
        <div id="content-bar">{{content}}</div>
    </div>
</template>

<script>
export default {
    name: "InfoBar",
    props: {
        title: {
            type: String,
        },
        content: {
            type: String,
        }
    },
}
</script>

<style scoped>
p{
    font-family: Anaheim;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 41px;
    background-color: aqua;
    color: #000000;
}

#content-bar {
    position: relative;
    width: 650px;
    height: 50px;


    background: #FFFFFF;
    border-radius: 13px;

    font-family: Anaheim;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 41px;

    color: #000000;
}
</style>