<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Créer utilisateur</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Créer utilisateur</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="newUser.username" label="Username"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="newUser.nom" label="Nom"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="newUser.prenom" label="Prenom"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="newUser.email" label="email"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "AddUser",
        data: () => ({
            dialog: false
        }),
        watch: {
            dialog (val) {
                val || this.close()
            },
        },
        computed:{
            newUser(){
                return this.$store.getters['user/newUser'];
            }
        },
        methods: {
            save () {
                this.$store.dispatch('user/save');
                this.close()
            },
            close () {
                this.dialog = false;
            },
        }
    }
</script>

<style scoped>

</style>