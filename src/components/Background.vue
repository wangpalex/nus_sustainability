<template>
<div id="background">
    <h1 id="app-heading"> NUStainable </h1>
    <!--nav class="navigation">
        <ul>
            <li><router-link class="router" to="/" exact>Home</router-link> </li>
            <li><router-link class="router" to="/exchange" exact>Items For Exchange</router-link> </li>
            <li><router-link class="router" to="/events" exact>Events</router-link> </li>
            <li><router-link class="router" to="/settings" exact>Settings</router-link> </li>
        </ul>
    </nav-->

    <Menu active-name="home" v-on:on-select="routePages"
          style="position: relative; top:200px; left:5px; border-radius: 5px">
        <!--suppress HtmlDeprecatedTag -->
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
    </Menu>


    <router-view class="page-view"></router-view>
</div>
</template>

<script>
export default {
    name: "Background",

    methods: {
        routePages(name) {
            console.log(name)
            //let name = event.target.getAttribute()
            if(name==="home") {
                this.$router.push({path:'/'})
            } else if(name==='exchange') {
                this.$router.push({path:'/exchange'})
            } else if(name==='events') {
                this.$router.push({path: '/events'})
            } else {
                this.$router.push({path: '/settings'})
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
    left: 40px;
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
    width: 1920px;
    height: 1080px;

    background-color: #0D47A1;
    /*
    border-radius: 70px;
     */
}

.navigation {
    position: absolute;
    width: 320px;
    height: 463px;
    left: 20px;
    top: 120px;
    color: white;
    font-size: 24px;
}

a:link {
    text-decoration: none;
}

.page-view {
    position: absolute;
    width: 1528px;
    height: 1031px;
    left: 250px;
    top: 25px;

    background: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 60px;
}

.router {
    font-size: 20px;
}
</style>