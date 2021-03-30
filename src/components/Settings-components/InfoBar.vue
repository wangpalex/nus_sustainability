<template>
    <div>
        <p>{{title}}</p>
        <p id="content-bar">{{content}}</p>
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
    position:relative;
    left:20px;
    top:-15px;

    font-family: Anaheim;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 41px;
    color: #000000;
}

#content-bar {
    position: relative;
    width: 650px;
    height: 36px;
    top:-36px;
    left:10px;

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