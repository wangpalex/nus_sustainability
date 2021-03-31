<template>
    <div>
        <p>{{title}}</p>
        <div class="content-bar">
            <p class="content">{{content}}</p>
        </div>
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

.content-bar {
    position: relative;
    width: 650px;
    height: 36px;
    top:-15px;
    left:10px;

    background: #FFFFFF;
    border-radius: 13px;

}

.content {
    position:absolute;
    top: 0px;
    font-family: Anaheim;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 41px;

    color: #000000;
}
</style>