<template>
<div id="background">
    <h1 id="app-heading"> NUSustainable </h1>

    <Menu id="navigation" active-name="home" v-on:on-select="routePages"
          style="position: relative; top:200px; left:5px;">
        <!--suppress HtmlDeprecatedTag -->
        <router-link class="router" to="/" exact/>
        <MenuItem name="home">
            <Icon type="document-text"></Icon>
                Home
        </MenuItem>

        <MenuItem name="exchange">
            <Icon type="chatbubbles"></Icon>
                Items For Exchange
        </MenuItem>

        <MenuItem name="events">
            <Icon type="heart"></Icon>
                Events
        </MenuItem>

        <MenuItem name="settings">
            <Icon type="heart-broken"></Icon>
                Settings
        </MenuItem>

        <MenuItem name="about">
            <Icon type="information"></Icon>
                About Us
        </MenuItem>
    </Menu>

    <router-view class="page-view"></router-view>
</div>
</template>

<script>
export default {
    name: "Background",

    methods: {
        routePages(name) {
            //console.log(name)
            //let name = event.target.getAttribute()
            if(name==="home") {
                this.$router.push({path:'/'})
            } else if(name==='exchange') {
                this.$router.push({path:'/exchange'})
            } else if(name==='events') {
                this.$router.push({path: '/events'})
            } else if(name==='settings') {
                this.$router.push({path: '/settings'})
            } else {
                this.$router.push({path:'/about'})
            }
        },
    }
}
</script>

<style scoped>

#app-heading {
    position: absolute;
    width: 296px;
    height: 57px;
    left: 30px;
    top: 77px;
    font-size: 30px;
    color: #FFA14F;

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

#background {
    font-family: "Helvetica Neue",Helvetica,
    "PingFang SC","Hiragino Sans GB",
    "Microsoft YaHei","微软雅黑",
    Arial,sans-serif;

    position: relative;
    width: 100%;
    height: 1080px;

    background-color: #0D47A1;
    /*
    border-radius: 70px;
     */
}

a:link {
    text-decoration: none;
}

.navigation {
    float: left;
}

.page-view {
    float: left;
    position: absolute;
    width: 1200px;
    height: 70%;

    left: 250px;
    top: 25px;

    background: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
}

.router {
    font-size: 20px;
}
</style>