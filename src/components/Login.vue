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

        <Button v-if="percent===100" type="success"
                long class="login-button"
                @click="signin"> Login </Button>
        <Button v-else type='error'
                long class="login-button"
                @click="promptFillIn"> Login </Button>
        <br>
        <Button v-if="percent===100" type="primary" class="signup-button"
                @click="signup"> Sign up </Button>
        <Button v-else type="error" class="signup-button"
                @click="promptFillIn"> Sign up</Button>
        <br>
        <Button type="primary" @click="googleSignin"
                icon="social-google" class="google-signin-button">
            Sign in with Google </Button>
    </form>
    <prog :percent=percent id="progress"></prog>
</div>
</template>

<script>
import LoginProgress from "@/components/Login-components/LoginProgress";
import firebase from 'firebase';

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

    methods: {
        signup() {

            let email="e0376916@u.nus.edu"  // this.emailValue
            let password = "0123456789Ab"// this.passwordValue
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    this.$Message.success("Successfully signed up")
                    var user = userCredential.user;
                    console.log("Signed up user:")
                    console.log(user)
                    // ...
                })
                .catch((error) => {

                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if(errorCode=='auth/email-already-in-use') {
                        this.$Message.error(errorMessage)
                    } else {
                        this.$Message.error("Failed to sign up")
                    }
                    console.log("errorCode")
                    console.log(errorCode)
                    console.log("errorMessage")
                    console.log(errorMessage)
                    // ..
                });

        },

        signin() {

            let email="e0376916@u.nus.edu"  // this.emailValue
            let password = "0123456789Ab"// this.passwordValue
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    this.$Message.success("Signed in")
                    var user = userCredential.user;
                    console.log("Signed in user:")
                    console.log(user)
                    // ...
                })
                .catch((error) => {
                    this.$Message.error("Failed to sign in")
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.print("errorCode")
                    console.log(errorCode)
                    console.log("errorMessage")
                    console.log(errorMessage)
                });

        },

        googleSignin() {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().useDeviceLanguage();
            firebase.auth()
                .signInWithPopup(provider)
                .then((result) => {
                    /** @type {firebase.auth.OAuthCredential} */
                    this.$Message.success("Signed in")
                    var credential = result.credential;

                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;

                    console.log("credential")
                    console.log(credential)
                    console.log("token")
                    console.log(token)
                    console.log("user")
                    console.log(user)
                    this.testAuth()
                })
                /*
                .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                }); */
        },

        //validateEmail(email) {

        //},

        promptFillIn() {
          this.$Message.error("Please fill in account infomation!")
        },

        testAuth() {
            console.log("Testing Auth")
            console.log(firebase.auth().currentUser)
        }
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

.login-button {
    position: relative;
    left: 0px;
    width: 500px;
}

.google-signin-button {
    position: relative;
    margin-top: 15px;
    left: 0px;
    width: 500px;
}

.signup-button {
    position: relative;
    margin-top: 15px;
    left: 0px;
    width: 500px;
}

#progress {
    position: relative;
    top: 200px;
    left:50px;
}
</style>