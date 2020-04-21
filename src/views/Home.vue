<template>
    <v-container>
    <HomeComponent/>
    <LoginComponent/>
    </v-container>
</template>

<script>
    import HomeComponent from "../components/home/HomeComponent";
    import LoginComponent from "../components/login/LoginComponent";
    export default {
        name: "Home",
        components: {LoginComponent, HomeComponent},
        data: () => ({
            apiData: '',
        }),
    }
</script>

<style scoped>

</style>