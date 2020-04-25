<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="12">
                <UserCrud></UserCrud>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
    import UserCrud from "../components/users/UserCrud";

    export default {
        name: "Users",
        components: {UserCrud}
    }
</script>

<style scoped>

</style>