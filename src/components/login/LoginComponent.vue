<template>
   <v-container>
       <v-row v-if="!authenticated">
           <v-btn @click="login">Login</v-btn>
       </v-row>
       <v-row v-if="authenticated">
           {{ user }}
       </v-row>
   </v-container>
</template>

<script>
    export default {
        name: "LoginComponent",
        methods: {
            login(){
			let port = (window.location.port ? ':' + window.location.port : '')
			window.location.href = '//' + window.location.hostname + port + '/private'            }
        },
        created() {
            this.$store.dispatch('user/authenticate');
        },
        computed: {
          authenticated(){
              return this.$store.getters['user/authenticated'];
          },
          user(){
              return this.$store.getters['user/user'];
          }
        }
    }
</script>

<style scoped>

</style>