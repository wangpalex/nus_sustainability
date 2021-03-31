<template>
<div>
    <h1 class="title"> Login </h1>
    <form id="login-form">
        <label for="email"> Email </label><br>
        <input type="email" for="email" id="email"><br>
        <label for="password"> Password </label><br>
        <input type="password" for="password" id="password"><br>
        <botton id="login-button"> Login </botton>
    </form>
</div>
</template>

<script>
export default {
name: "Login"
}
</script>

<style scoped>
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

#login-form {
    position: relative;
    width: 1000px;

    border-color: aqua;
    border-style: dotted;
    border-width: 3px;
}

label {
    font-family: Anaheim;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 58px;

    color: dimgrey;
}

input {
    width: 300px;
    height: 30px;
}

#login-button {
    position: relative;
    width: 3000px;
    font-family: Anaheim;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 58px;

    background-color: aquamarine;
    color: dimgrey;
}
</style>