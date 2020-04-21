<template>
    <div>
    <v-btn @click="init">Cliquez ici </v-btn>
   {{ apiData }}
    </div>
</template>

<script>
    import Api from "../../services/Api";

    export default {
        name: "HomeComponent",
        data: () => ({
            apiData: '',
        }),
        methods: {
            init(){
                Api().get('/client/test').then(response => {
                    console.log(response);
                    this.apiData = response;
                }).catch(error => console.error(error));

            },
        }
    }
</script>

<style scoped>

</style>