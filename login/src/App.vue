<template>
<v-app>
    <v-app-bar app color="blue" v-if="isLoggedIn" dark>
      <h1>Employ</h1>
       <v-spacer></v-spacer>
        <v-btn icon @click="logout" title="Logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
        <router-view />
    </v-content>
</v-app>
</template>

<script>
export default {
    name: 'App',
    components: {},
    data: () => ({
    }),
    computed: {
        isLoggedIn: function () {
            return this.$store.getters.isLoggedIn
        }
    },
     methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
      },
    },
    created: function () {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function () {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch('logout')
          }
          throw err;
        });
      });
    }
};
</script>