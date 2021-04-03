<template>
    <div>
        <h1 class="title"> Sign Up </h1>
        <form id="signup-form">
            <label> Email </label><br>
            <Input type="email" for="email"
                   v-model="emailValue" placeholder="Please enter your NUSNET email"
                   clearable style="width: 500px"></Input><br>

            <label> Password </label><br>
            <Input type="password" for="password"
                   v-model="passwordValue" placeholder="Please enter your password"
                   clearable style="width: 500px"></Input><br>

            <Button v-if="percent===100" type="success"
                    long class="signup-button"
                    @click="signup"> Sign up </Button>
            <Button v-else type='error'
                    long class="signup-button"
                    @click="promptFillIn"> Sign up </Button>
            <br>
            <Button type="primary" @click="googleSignin"
                    icon="social-google" class="google-signin-button">
                    Sign up with Google </Button>
        </form>
    </div>
</template>

<script>
import firebase from "firebase";

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
            let email = this.emailValue
            let password = this.passwordValue
            if(this.validateEmail(email)) {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        // Signed in
                        this.$Message.success("Successfully signed up")
                        var user = userCredential.user;
                        console.log("Signed up user:")
                        console.log(user)

                        this.verifyEmail(user)
                    })
                    .catch((error) => {

                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if(errorCode=='') {
                            this.$Message.error(errorMessage)
                        } else {
                            this.$Message.error(errorMessage)
                        }
                        console.log("errorCode")
                        console.log(errorCode)
                        console.log("errorMessage")
                        console.log(errorMessage)
                        // ..
                    });
            } else {
                this.$Message.error("Please enter valid NUSNET email")
            }
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
                    this.$router.go(-1)
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


        verifyEmail(user) {

            var actionCodeSettings = {
                url: 'http://localhost:8080/settings/login',
                handleCodeInApp: true
            };

            user.sendEmailVerification(actionCodeSettings)
                .then(function() {
                  // Verification email sent.
                })
                .catch((error) => {
                  this.$Message.error(error)
                });
        },


        validateEmail(email) {
            const regex1 = /^[eE]\d\d\d\d\d\d\d@u\.nus\.edu$/g;  // e.g. e0376916@u.nus.edu
            const regex2 = /^[a-zA-Z\d]*@nus\.edu\.sg$/g;  // e.g. disrt@nus.edu.sg
            const regex3 = /^[a-zA-Z\d]*@e\.ntu\.edu\.sg$/g;  // e.g. zhen0123@e.ntu.edu.sg
            return email.match(regex1) || email.match(regex2) || email.match(regex3);
        },

        promptFillIn() {
            this.$Message.error("Please fill in account infomation")
        },
    },

    created() {
        if(this.$route.params.filledEmail != '') {
            this.emailValue = this.$route.params.filledEmail
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

#signup-form {
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

.signup-button {
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

</style>