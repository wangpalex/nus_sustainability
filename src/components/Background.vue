<template>
<div id="background">
    <h1 id="app-heading"> NUStainable </h1>
    <nav class="navigation">
        <ul>
            <li><router-link class="router" to="/" exact>Home</router-link> </li>
            <li><router-link class="router" to="/exchange" exact>Items For Exchange</router-link> </li>
            <li><router-link class="router" to="/events" exact>Events</router-link> </li>
            <li><router-link class="router" to="/settings" exact>Settings</router-link> </li>
        </ul>
    </nav>

    <Menu :theme="theme3" active-name="1" style="position: relative;top:300px;">
        <MenuGroup title="内容管理">
            <MenuItem name="1">
                <Icon type="document-text"></Icon>
                文章管理
            </MenuItem>
            <MenuItem name="2">
                <Icon type="chatbubbles"></Icon>
                评论管理
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="统计分析">
            <MenuItem name="3">
                <Icon type="heart"></Icon>
                用户留存
            </MenuItem>
            <MenuItem name="4">
                <Icon type="heart-broken"></Icon>
                流失用户
            </MenuItem>
        </MenuGroup>
    </Menu>


    <router-view class="page-view"></router-view>
</div>
</template>

<script>
export default {
name: "Background"
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
    position: relative;
    width: 1920px;
    height: 1080px;

    background: #003882;
    border-radius: 70px;
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
  color: white;
  font-size: 20px;
  font-family: "Anaheim"

}
</style>