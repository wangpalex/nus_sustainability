<template>
<div>
    <h1 class="title"> Login </h1>
    <form id="login-form">
        <label> Email </label><br>
        <Input type="email" for="email"
                 v-model="emailValue" placeholder="Please enter your email"
                 clearable style="width: 500px"></Input><br>

        <label> Password </label><br>
        <Input type="password" for="password"
                 v-model="passwordValue" placeholder="Please enter your password"
                 clearable style="width: 500px"></Input><br>

        <Button type="success" long id="login-button"> Login </Button>

    </form>
    <prog :percent=percent id="progress"></prog>
</div>
</template>

<script>
import LoginProgress from "@/components/Login-components/LoginProgress";

export default {
name: "Login",
    data() {
        return {
            emailValue:"",
            passwordValue:"",
            //percent: 0,
        }
    },

    components:{
        prog: LoginProgress,
    },

    computed: {
        percent() {
            if(this.emailValue === '' && this.passwordValue === '') {
                return 0;
            } else if(this.emailValue === '' || this.passwordValue === '') {
                return 50;
            } else {
                return 100;
            }
        },
    },
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

#progress {
    position: relative;
    top: 200px;
    left:50px;
}
</style>