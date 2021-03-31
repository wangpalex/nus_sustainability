<template>
<div>
    <h1 class="title"> Login </h1>
    <form id="login-form">
        <label> Email </label><br>
        <i-input type="email" for="email"
                 v-model="emailValue" placeholder="Please enter your email"
                 clearable style="width: 500px"></i-input><br>

        <label> Password </label><br>
        <i-input type="password" for="password"
                 v-model="emailValue" placeholder="Please enter your password"
                 clearable style="width: 500px"></i-input><br>

        <i-button type="success" long id="login-button"> Login </i-button>
    </form>
</div>
</template>

<script>
export default {
name: "Login",
    components:{

    }
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
    left:50px;
    top: 100px;
    width: 1000px;
}

label {
    font-family: Anaheim;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 58px;

    color: dimgrey;
}

#login-button {
    position: relative;
    left: 0px;
    width: 500px;
}
</style>
