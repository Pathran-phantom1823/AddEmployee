<template>
<div id="background">
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="y === 'top'">
        {{ text }}
        <v-btn color="blue" text @click="snackbar = false">
            Close
        </v-btn>
    </v-snackbar>
    <v-flex justify-center>
        <h2 class="subtitle-110 text-center">Employ</h2>

        <v-card class="mx-auto card" max-width="400">
            <v-container>
                <center>
                    <h1>Admin</h1>
                </center>
                <form id="form">
                    <v-container>
                        <v-text-field prepend-inner-icon="people" v-model="username" :rules="[rules.required]" label="Username"></v-text-field>
                        <v-text-field prepend-inner-icon="lock" v-model="password" :append-icon="show1 ? 'visibility' : 'visibility_off'" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" counter @click:append="show1 = !show1"></v-text-field>
                        <v-btn class="mr-4" @click="login" color="green">submit</v-btn>
                        <v-btn>clear</v-btn>
                    </v-container>
                </form>
                <br />
            </v-container>
        </v-card>
    </v-flex>
</div>
</template>

<style>
h2 {
    font-weight: normal;
    color: teal;
}

.v-content__wrap {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    max-width: 100%;
    position: relative;
    background-image: url('http://www.yellowstoneholding.ch/Content/Image/38391858_ML.jpg');
    background-size: cover;
}

.v-application .text-center {
    text-align: center !important;
    font-size: 80px;
    color: white;
}

#image {
    width: 40%;
    height: 40%;
}
</style>

<script>
export default {
    data() {
        return {
            y: 'top',
            snackbar: false,
            text: 'Username or Password is Incorrect! ',
            timeout: 2000,
            show1: false,
            username: "",
            password: "",
            rules: {
                required: value => !!value || "Required.",
                min: value => value.length >= 8 || "Min 8 characters",
                password: value => {
                    const pattern = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
                    //   valid = true;
                    return (
                        pattern.test(value) ||
                        "Password Must contain 1 capital, special characters, and more than 8 letters"
                    );
                }
            }
        };

    },
    methods: {
        login: function () {
            let username = this.username
            let password = this.password
            this.$store.dispatch('login', {
                    username,
                    password
                })
                .then(() => this.$router.push('/employees'))
                .catch(() => this.snackbar = true)
        }
    }
};
</script>
