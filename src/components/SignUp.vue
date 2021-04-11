<template>
    <div>
        <h1 class="title"> Sign Up </h1>
        <form id="signup-form">
            <label> User Name </label><br>
            <Input for="username"
                   v-model="username" placeholder="Please enter your user name"
                   clearable style="width: 500px"></Input><br>

            <label> Course of Study </label><br>
            <Select for="course" v-model="course" placeholder="Please select"
                    style="width: 500px">
                <OptionGroup label="School of Computing">
                    <Option v-for="item in computingCourses" :value="item.value" :key="item.value">
                        {{item.label}}
                    </Option>
                </OptionGroup>
                <OptionGroup label="Faculty of Science">
                    <Option v-for="item in scienceCourses" :value="item.value" :key="item.value">
                        {{item.label}}
                    </Option>
                </OptionGroup>
                <OptionGroup label="Other Faculties">
                    <Option value="Others">
                        Other Programs
                    </Option>
                </OptionGroup>
            </Select><br>

            <label> NUS Residence Affiliation </label><br>
            <Select for="residence" v-model="residence" placeholder="Please select"
                    style="width: 500px">
                <OptionGroup label="Residential Colleges">
                    <Option v-for="item in RCs" :value="item.value" :key="item.value">
                        {{item.label}}
                    </Option>
                </OptionGroup>
                <OptionGroup label="Hall of Residence">
                    <Option v-for="item in halls" :value="item.value" :key="item.value">
                        {{item.label}}
                    </Option>
                </OptionGroup>
                <OptionGroup label="Residences">
                    <Option v-for="item in residences" :value="item.value" :key="item.value">
                        {{item.label}}
                    </Option>
                </OptionGroup>
                <OptionGroup label="Others">
                    <Option value="Others">
                        Others
                    </Option>
                </OptionGroup><br>
            </Select><br>

            <label> User Image (Optional) </label><br>
            <img-upload @input="handleFile"></img-upload>
            <br>

            <Button v-if="userInfoReady" type="primary" @click="googleSignin"
                    icon="social-google" class="google-signin-button">
                    Sign up with Google </Button>
            <Button v-else type="error" @click="promptFillIn"
                    icon="social-google" class="google-signin-button">
                    Sign up with Google </Button>

            <br>

            <label> Email </label><br>
            <Input type="email" for="email"
                   v-model="emailValue" placeholder="Please enter your NUSNET email"
                   clearable style="width: 500px"></Input><br>

            <label> Password </label><br>
            <Input type="password" for="password"
                   v-model="passwordValue" placeholder="Please enter your password"
                   clearable style="width: 500px"></Input><br>

            <Button v-if="userInfoReady && accountInfoReady" type="success"
                    long class="signup-button"
                    @click="signup"> Sign up with email </Button>
            <Button v-else type='error'
                    long class="signup-button"
                    @click="promptFillIn"> Sign up with email </Button>

        </form>
    </div>
</template>

<script>
import ImageUpload from "@/components/ImageUpload";
import firebase from "firebase";
import db from "../firebase"

export default {
    name: "Login",
    data() {
        return {
            emailValue:"",
            passwordValue:"",
            username:"",
            course:"",
            residence:"",
            imageFile:null,
            percent:0,

            computingCourses: [
                {
                    label:"Business Analytics",
                    value:"Business Analytics"
                },
                {
                    label:"Computer Science",
                    value:"Computer Science"
                },
                {
                    label:"Information Systems",
                    value:"Information Systems"
                },
                {
                    label:"Information Security",
                    value:"Information Security"
                }
            ],
            scienceCourses:[
                {
                    label:"Mathematics",
                    value:"Mathematics"
                },
                {
                    label:"Quantitative Finance",
                    value:"Quantitative Finance"
                },
                {
                    label:"Data Science and Analytics",
                    value:"Data Science and Analytics"
                },
                {
                    label:"Statistics",
                    value:"Statistics"
                },
                {
                    label:"Physics",
                    value:"Physics"
                },
                {
                    label:"Chemistry",
                    value:"Chemistry"
                },
                {
                    label:"Biology",
                    value:"Biology"
                },
                {
                    label:"Other Science Programs",
                    value:"Other Science Programs"
                }
            ],
            RCs: [
                {
                    label:"College of Alice and Peter Tan",
                    value:"College of Alice and Peter Tan"
                },
                {
                    label:"RC4",
                    value:"RC4"
                },
                {
                    label:"Tembusu",
                    value:"Tembusu"
                },
                {
                    label:"Cinnamon",
                    value:"Cinnamon"
                },
                {
                    label:"Yale-NUS College",
                    value:"Yale-NUS College"
                },
                {
                    label:"RVRC",
                    value:"RVRC"
                }
            ],
            halls: [
                {
                    label:"Raffles Hall",
                    value:"Raffles Hall"
                },
                {
                    label:"Kent Ridge Hall",
                    value:"Kent Ridge Hall"
                },
                {
                    label:"Sheares Hall",
                    value:"Sheares Hall"
                },
                {
                    label:"Eusoff Hall",
                    value:"Eusoff Hall"
                },
                {
                    label:"Temasek Hall",
                    value:"Temasek Hall"
                },
                {
                    label:"King Edward VII Hall",
                    value:"King Edward VII Hall"
                }
            ],
            residences: [
                {
                    label:"Prince George's Park Residence",
                    value:"Prince George's Park Residence"
                },
                {
                    label:"Utown Residence",
                    value:"Utown Residence"
                }
            ]
        }
    },

    components:{
        imgUpload: ImageUpload,
    },

    computed: {
        userInfoReady() {
            if(this.username==='' || this.course==='' || this.residence==='') {
                return false
            } else {
                return true
            }
        },

        accountInfoReady() {
            if(this.emailValue==='' || this.passwordValue==='') {
                return false;
            } else {
                return true;
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
                        this.$Message.success("Successfully signed up");

                        var user = userCredential.user;
                        this.verifyEmail(user);

                        user.updateProfile({
                            displayName: this.username,
                        });
                        let userRef = db.collection('users').doc(user.uid);
                        let imgPath = this.uploadImg();
                        userRef.set({
                            name:this.username,
                            course:this.course,
                            residence:this.residence,
                            itemsExchanged:0,
                            eventsAttended:0,
                            imagePath:imgPath,
                        });

                        this.$router.go(-1);
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
                    //var credential = result.credential;
                    // This gives you a Google Access Token. You can use it to access the Google API.

                    //var token = credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;

                    user.updateProfile({
                        displayName: this.username,
                    })
                    let userRef = db.collection('users').doc(user.uid)
                    let imgPath = this.uploadImg();
                    userRef.set({
                        name:this.username,
                        course:this.course,
                        residence:this.residence,
                        itemsExchanged:0,
                        eventsAttended:0,
                        imagePath:imgPath,  // reference string for downloading from storage
                    })
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

            const actionCodeSettings = {
                url: "https://nusustainability.web.app/settings/login",
                handleCodeInApp: true
            };

            user.sendEmailVerification(actionCodeSettings)
                .then(
                    // Verification email sent.
                    this.$Notice.warning({
                        title:"Verify your email",
                        desc:"Please check your inbox (also spam) for verification link sent.",
                        duration: 10
                    })
                )
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
            this.$Message.error("Please fill in account information")
        },

        handleFile(file) {
            this.imageFile = file
            console.log("Handle input:")
            console.log(this.imageFile)
        },

        uploadImg() {
            if(!this.imageFile) {
                return null
            }

            let path = "user_images/" + this.imageFile.name
            let storageRef = firebase.storage().ref().child(path);
            let task = storageRef.put(this.imageFile)
            task.on("state_changed",
                function progress(snapshot) {
                    this.percent = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                },
                function error(err) {
                    this.$Message.error(err.message)
                },
                function complete() {
                    this.$Message.success("Upload completed")
                }
            )
            return path
        },
    },

    created() {
        if(this.$route.params.filledEmail != '') {
            this.emailValue = this.$route.params.filledEmail
        }
    },

    mounted() {

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
    margin-top: 30px;
    left:50px;
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
    margin-top: 50px;
}

.google-signin-button {
    position: relative;
    margin-bottom: 30px;
    left: 0px;
    width: 500px;
}

</style>