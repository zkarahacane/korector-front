<template>
    <HomeComponent/>
</template>

<script>
    import HomeComponent from "../components/home/HomeComponent";
    export default {
        name: "Home",
        components: {HomeComponent},
        data: () => ({
            apiData: '',
        }),
    }
</script>

<style scoped>

</style>