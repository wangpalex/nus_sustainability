<template>
<div>
    <h1 class="title"> Login </h1>
    <Button type="dashed" id="goBackButton" @click="$router.go(-1)">Back to Profile</Button>
    <form id="login-form">
        <label> Email </label><br>
        <Input type="email" for="email"
                 v-model="emailValue" placeholder="Please enter your email"
                 clearable style="width: 500px"></Input><br>

        <label> Password </label><br>
        <Input type="password" for="password"
                 v-model="passwordValue" placeholder="Please enter your password"
                 clearable style="width: 500px"></Input><br><br>

        <Button v-if="percent===100" type="success"
                long class="login-button"
                @click="signin"> Login </Button>
        <Button v-else type='error'
                long class="login-button"
                @click="promptFillIn"> Login </Button>
        <br>
        <Button type="info" class="signup-button"
                @click="routeSignup"> Sign up </Button>
        <br>
        <Button type="primary" @click="googleSignin"
                icon="social-google" class="google-signin-button">
            Login with Google </Button>
    </form>
</div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: "Login",
    data() {
        return {
            emailValue:"demo@nusustainability.web.app",
            passwordValue:"123456",
            //percent: 0,
        }
    },

    components:{

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
        signin() {
            let email = this.emailValue
            let password = this.passwordValue
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    var user = userCredential.user;
                    //console.log("Signed in user:")
                    //console.log(user)
                    if(user.emailVerified || email.match(/^demo@nusustainability.web.app$/g)) {
                        this.$Message.success("Signed in")
                        this.$router.push({path:"/profile"})
                    } else {
                        this.$Message.error("This email is not verified")
                        // Sign out
                        firebase.auth().signOut().then(() => {
                            //...
                        }).catch((error) => {
                            this.$Message.error(error.message)
                        });
                    }

                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    //console.log("errorCode")
                    //console.log(errorCode)
                    //console.log("errorMessage")
                    //console.log(errorMessage)
                    if(errorCode=="auth/user-not-found") {
                        this.$Message.error("The email is not registered, please sign up")
                        this.$router.push({name:"signup", params:{filledEmail:this.emailValue}})
                    } else {
                        this.$Message.error(errorMessage)
                    }

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
                    this.$router.push({path:"/profile"})

                    //var credential = result.credential;
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    //var token = credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;

                    //console.log("credential")
                    //console.log(credential)
                    //console.log("token")
                    //console.log(token)
                    //console.log("user")
                    console.log(user.uid)
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

        promptFillIn() {
          this.$Message.error("Please fill in account infomation!")
        },

        routeSignup() {
          this.$router.push({path:"signup"})
        },
    },
    created() {
        this.$Message.info("Please sign in")
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

#goBackButton {
    position: relative;
    left: 50px;
    margin-top: 10px;
}

#login-form {
    position: relative;
    left:50px;
    margin-top: 10px;
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

.signout-button {
    position: relative;
    margin-top: 85px;
    left: 0px;
    width: 500px;
}

#progress {
    position: relative;
    top: 200px;
    left:50px;
}
</style>